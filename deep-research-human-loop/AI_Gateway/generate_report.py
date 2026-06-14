#!/usr/bin/env python3
"""Generate markdown report from AI Gateway deep research JSON results."""

import json
import os
import glob
import re
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).parent
RESULTS_DIR = BASE_DIR / "results"
FIELDS_PATH = BASE_DIR / "fields.yaml"
OUTPUT_PATH = BASE_DIR / "report.md"

# Category aliases: fields.yaml name -> possible JSON keys
CATEGORY_MAPPING = {
    "基本信息": ["基本信息", "basic_info"],
    "功能特性": ["功能特性", "features"],
    "部署与架构": ["部署与架构", "deployment"],
    "Agent 与生态集成": ["Agent 与生态集成", "agent_ecosystem"],
    "性能特征": ["性能特征", "performance"],
    "治理与合规": ["治理与合规", "governance"],
    "内容安全": ["内容安全", "content_safety"],
    "AI 网关 vs 传统 7 层网关对比": ["AI 网关 vs 传统 7 层网关对比", "ai_vs_l7_gateway"],
}


def load_fields():
    """Parse fields.yaml to get category order and field definitions."""
    with open(FIELDS_PATH, 'r') as f:
        content = f.read()

    # Simple YAML parser for our known structure
    categories = []
    current_cat = None
    in_fields = False

    for line in content.split('\n'):
        line = line.rstrip()
        if line.startswith('  - name: '):
            # Category name
            cat_name = line.split('  - name: ', 1)[1].strip()
            current_cat = {'name': cat_name, 'slug': '', 'fields': []}
            categories.append(current_cat)
            in_fields = False
        elif line.startswith('    slug: '):
            if current_cat:
                current_cat['slug'] = line.split('slug: ', 1)[1].strip()
        elif line.startswith('    fields:'):
            in_fields = True
        elif in_fields and line.startswith('      - name: '):
            field_name = line.split('  - name: ', 1)[1].strip() if '  - name: ' in line else line.split('      - name: ', 1)[1].strip()
            if current_cat:
                current_cat['fields'].append(field_name)

    return categories


def find_field_value(data, field_name, category_names):
    """Find a field value in JSON data, checking multiple possible category keys."""
    # Try each possible category key
    for cat_name in category_names:
        if cat_name in data and isinstance(data[cat_name], dict):
            if field_name in data[cat_name]:
                return data[cat_name][field_name]
    # Also try top-level
    if field_name in data and not isinstance(data[field_name], (dict, list)):
        return data[field_name]
    return None


def is_uncertain(data, field_name, category_names):
    """Check if a field value is uncertain."""
    val = find_field_value(data, field_name, category_names)
    if val is None:
        return True
    if isinstance(val, str) and ('[不确定]' in val or '[不确定' in val):
        return True
    uncert = data.get('uncertain', [])
    if isinstance(uncert, list):
        for u in uncert:
            if field_name in str(u):
                return True
    return False


def format_value(val, indent_level=0):
    """Format a value for markdown output."""
    indent = "  " * indent_level

    if val is None:
        return "_无数据_"

    if isinstance(val, str):
        val = val.strip()
        # Escape markdown special chars in text
        if len(val) > 200:
            return f"\n\n> {val}\n"
        return val

    if isinstance(val, bool):
        return "是" if val else "否"

    if isinstance(val, (int, float)):
        return str(val)

    if isinstance(val, list):
        if not val:
            return "_无_"
        if all(isinstance(item, dict) for item in val):
            # List of dicts
            lines = []
            for item in val:
                parts = []
                for k, v in item.items():
                    parts.append(f"{k}: {format_value(v, 0)}")
                lines.append(" | ".join(parts))
            return "\n".join(f"{indent}- {line}" for line in lines)
        else:
            # Simple list
            items = [format_value(item, 0) for item in val]
            if sum(len(str(i)) for i in items) < 120:
                return ", ".join(str(i) for i in items)
            else:
                return "\n".join(f"{indent}- {item}" for item in items)

    if isinstance(val, dict):
        lines = []
        for k, v in val.items():
            formatted_v = format_value(v, indent_level + 1)
            if '\n' in str(formatted_v):
                lines.append(f"{indent}- **{k}**: {formatted_v}")
            else:
                lines.append(f"{indent}- **{k}**: {formatted_v}")
        return "\n".join(lines)

    return str(val)


def slugify(name):
    """Create anchor-compatible slug from name."""
    # Keep only alphanumeric, Chinese chars, hyphens, underscores
    s = re.sub(r'[^\w\-一-龥]', '', name.replace(' ', '-').replace('(', '').replace(')', ''))
    return s.lower()


def main():
    # Load fields structure
    categories = load_fields()

    # Load all JSON results
    json_files = sorted(glob.glob(str(RESULTS_DIR / "*.json")))
    results = []

    for jf in json_files:
        with open(jf, 'r') as f:
            data = json.load(f)
        data['_source_file'] = os.path.basename(jf)
        results.append(data)

    # Sort by Stars descending (find Stars field)
    def get_stars(data):
        val = find_field_value(data, 'Stars', ['基本信息', 'basic_info'])
        if val is None:
            return 0
        try:
            # Handle "约 50,300" or "50,300" or "50300"
            s = str(val).replace('约', '').replace('~', '').replace(',', '').replace('，', '').strip()
            # Handle range: "5000-6000"
            if '-' in s:
                s = s.split('-')[0]
            return int(float(s))
        except:
            return 0

    results.sort(key=get_stars, reverse=True)

    # Build markdown
    md = []
    topic = "AI 网关开源项目及与传统 7 层网关的异同"
    md.append(f"# {topic}\n")
    md.append(f"> 深度调研报告 | 共 {len(results)} 个开源项目 | 生成日期: 2026-06-14\n")

    # ── TABLE OF CONTENTS ──
    md.append("## 目录\n")
    for i, data in enumerate(results, 1):
        name = find_field_value(data, '项目名称', ['基本信息', 'basic_info']) or os.path.basename(data['_source_file']).replace('.json', '')
        stars = find_field_value(data, 'Stars', ['基本信息', 'basic_info']) or '?'
        lang = find_field_value(data, '主要语言', ['基本信息', 'basic_info']) or '?'
        anchor = slugify(name)
        md.append(f"{i}. [{name}](#{anchor}) — Stars: {stars} | {lang}")
    md.append("")

    # ── CATEGORY DETAILS ──
    for cat in categories:
        cat_name = cat['name']
        cat_keys = CATEGORY_MAPPING.get(cat_name, [cat_name])
        md.append(f"## {cat_name}\n")

        for i, data in enumerate(results, 1):
            name = find_field_value(data, '项目名称', ['基本信息', 'basic_info']) or '?'
            anchor = slugify(name)
            md.append(f"### {i}. {name}\n")

            has_content = False
            for field_name in cat['fields']:
                val = find_field_value(data, field_name, cat_keys)
                if val is None:
                    continue
                if is_uncertain(data, field_name, cat_keys):
                    continue

                formatted = format_value(val)
                if formatted:
                    has_content = True
                    if '\n' in str(formatted):
                        md.append(f"**{field_name}**: {formatted}\n")
                    else:
                        md.append(f"- **{field_name}**: {formatted}")

            if not has_content:
                md.append("_（该类别无确定的字段值）_\n")
            md.append("")

    # ── UNCERTAIN SUMMARY ──
    md.append("## 不确定字段汇总\n")
    for data in results:
        name = find_field_value(data, '项目名称', ['基本信息', 'basic_info']) or '?'
        uncert = data.get('uncertain', [])
        if uncert:
            md.append(f"### {name}\n")
            for u in uncert:
                md.append(f"- {u}")
            md.append("")
        else:
            md.append(f"- **{name}**: 无\n")

    # ── OTHER FIELDS (not in fields.yaml) ──
    md.append("## 其他信息\n")
    known_fields = set()
    for cat in categories:
        for f in cat['fields']:
            known_fields.add(f)

    skip_keys = {'uncertain', '_source_file'}
    skip_keys.update(CATEGORY_MAPPING.keys())

    for data in results:
        name = find_field_value(data, '项目名称', ['基本信息', 'basic_info']) or '?'
        extras = {}
        for key in data:
            if key in skip_keys:
                continue
            if isinstance(data[key], (dict, list)):
                continue
            if key not in known_fields:
                extras[key] = data[key]
        if extras:
            md.append(f"### {name}\n")
            for k, v in extras.items():
                md.append(f"- **{k}**: {format_value(v)}")
            md.append("")

    # Write output
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(md))

    print(f"报告已生成: {OUTPUT_PATH}")
    print(f"共 {len(results)} 个项目, {len(categories)} 个分类")


if __name__ == '__main__':
    main()
