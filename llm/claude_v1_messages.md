# Anthropic Messages API 流式返回值（Streaming Response）结构体字段详细解析

Claude 官方接口md：https://platform.claude.com/docs/en/api/messages/create.md

> 基于 `POST /v1/messages` 接口，当请求参数 `stream: true` 时，服务端以 **Server-Sent Events (SSE)** 格式增量返回响应。

---

## 一、事件流总体顺序

```
message_start
  → content_block_start
    → content_block_delta (×N)
    → content_block_stop
  → (更多 content_block 循环...)
  → message_delta
  → message_stop
```

> 流中可能随时穿插 `ping` 事件和 `error` 事件。

---

## 二、事件类型详解

### 1. `message_start`

流的第一个事件，携带初始 `Message` 对象（此时 `content` 为空数组）。

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"message_start"` | 事件类型标识 |
| `message` | `Message` | 初始消息对象，结构见下方详解 |

**`message` 对象字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 消息唯一标识符，格式如 `msg_1nZdL29xx5MUA1yADyHTEsnR8uuvGzszyY` |
| `type` | `"message"` | 固定值，标识对象类型 |
| `role` | `"assistant"` | 固定值，表示这是 assistant 生成的消息 |
| `content` | `array` | 初始为空数组 `[]`，内容将通过后续 delta 事件填充 |
| `model` | `string` | 实际使用的模型名称，如 `"claude-opus-4-6"` |
| `stop_reason` | `null` | 初始为 `null`，最终停止原因在 `message_delta` 事件中返回 |
| `stop_sequence` | `null` | 初始为 `null`，触发停止的自定义序列 |
| `usage` | `Usage` | 初始 token 使用量统计 |

**`usage` 对象字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `input_tokens` | `number` | 输入消耗的 token 数量 |
| `output_tokens` | `number` | 输出消耗的 token 数量（初始通常为 1） |
| `cache_creation_input_tokens` | `number` | 用于创建缓存条目的输入 token 数量 |
| `cache_read_input_tokens` | `number` | 从缓存读取的输入 token 数量 |
| `inference_geo` | `string` | 推理处理所在的地理区域 |
| `server_tool_use` | `ServerToolUsage` | 服务端工具使用统计 |
| `service_tier` | `"standard" \| "priority" \| "batch"` | 使用的服务层级 |
| `cache_creation` | `CacheCreation` | 按 TTL 分类的缓存 token 明细 |

**`cache_creation` 对象：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `ephemeral_5m_input_tokens` | `number` | 创建 5 分钟缓存条目消耗的 token 数 |
| `ephemeral_1h_input_tokens` | `number` | 创建 1 小时缓存条目消耗的 token 数 |

**`server_tool_use` 对象：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `web_search_requests` | `number` | web 搜索工具请求次数 |
| `web_fetch_requests` | `number` | web 抓取工具请求次数 |

**示例：**
```json
event: message_start
data: {
  "type": "message_start",
  "message": {
    "id": "msg_1nZdL29xx5MUA1yADyHTEsnR8uuvGzszyY",
    "type": "message",
    "role": "assistant",
    "content": [],
    "model": "claude-opus-4-6",
    "stop_reason": null,
    "stop_sequence": null,
    "usage": {
      "input_tokens": 25,
      "output_tokens": 1
    }
  }
}
```

---

### 2. `content_block_start`

标记一个新的内容块开始。`index` 字段对应最终 `Message.content` 数组中的位置索引。

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"content_block_start"` | 事件类型标识 |
| `index` | `number` | 当前内容块在 `content` 数组中的索引位置 |
| `content_block` | `ContentBlock` | 内容块初始对象，类型取决于具体块类型 |

**`content_block` 的可能类型：**

#### 2.1 文本块（Text Block）

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"text"` | 文本内容块 |
| `text` | `string` | 初始为空字符串 `""`，后续通过 `text_delta` 填充 |

#### 2.2 工具调用块（Tool Use Block）

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"tool_use"` | 工具调用块 |
| `id` | `string` | 工具调用唯一 ID，如 `"toolu_01D7FLrfh4GYq7yT1ULFeyMV"` |
| `name` | `string` | 调用的工具名称 |
| `input` | `object` | 初始为空对象 `{}`，后续通过 `input_json_delta` 填充 |

#### 2.3 思考块（Thinking Block）

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"thinking"` | 扩展思考块（需开启 extended thinking） |
| `thinking` | `string` | 初始为空字符串 `""` |

#### 2.4 服务端工具调用块（Server Tool Use Block）

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"server_tool_use"` | 服务端工具调用块 |
| `id` | `string` | 工具调用唯一 ID |
| `name` | `string` | 服务端工具名称，可选值：`"web_search"` / `"web_fetch"` / `"code_execution"` / `"bash_code_execution"` / `"text_editor_code_execution"` / `"tool_search_tool_regex"` / `"tool_search_tool_bm25"` |
| `input` | `object` | 初始为空对象 `{}` |
| `caller` | `Caller` | 调用来源标识 |

#### 2.5 Web 搜索结果块（Web Search Tool Result Block）

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"web_search_tool_result"` | Web 搜索结果块 |
| `tool_use_id` | `string` | 关联的 tool_use ID |
| `content` | `array \| error` | 搜索结果数组或错误对象 |

#### 2.6 Web 抓取结果块（Web Fetch Tool Result Block）

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"web_fetch_tool_result"` | Web 抓取结果块 |
| `tool_use_id` | `string` | 关联的 tool_use ID |
| `content` | `WebFetchBlock \| error` | 抓取结果或错误对象 |

#### 2.7 代码执行结果块（Code Execution Tool Result Block）

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"code_execution_tool_result"` | 代码执行结果块 |
| `tool_use_id` | `string` | 关联的 tool_use ID |
| `content` | `CodeExecutionResult \| error` | 执行结果或错误对象 |

**示例（文本块）：**
```json
event: content_block_start
data: {
  "type": "content_block_start",
  "index": 0,
  "content_block": {
    "type": "text",
    "text": ""
  }
}
```

**示例（工具调用块）：**
```json
event: content_block_start
data: {
  "type": "content_block_start",
  "index": 1,
  "content_block": {
    "type": "tool_use",
    "id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
    "name": "get_stock_price",
    "input": {}
  }
}
```

---

### 3. `content_block_delta`

流式增量内容事件。这是实际内容传输的核心事件，包含不同类型的 `delta`。

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"content_block_delta"` | 事件类型标识 |
| `index` | `number` | 对应内容块索引 |
| `delta` | `Delta` | 增量数据，类型取决于内容块类型 |

**`delta` 的可能类型：**

#### 3.1 `text_delta` — 文本增量

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"text_delta"` | 文本增量标识 |
| `text` | `string` | 增量文本片段，需客户端拼接 |

```json
event: content_block_delta
data: {
  "type": "content_block_delta",
  "index": 0,
  "delta": {
    "type": "text_delta",
    "text": "Hello"
  }
}
```

#### 3.2 `input_json_delta` — 工具输入 JSON 增量

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"input_json_delta"` | JSON 增量标识 |
| `partial_json` | `string` | 部分 JSON 字符串片段，需累积后在 `content_block_stop` 时完整解析 |

```json
event: content_block_delta
data: {
  "type": "content_block_delta",
  "index": 1,
  "delta": {
    "type": "input_json_delta",
    "partial_json": "{\"location\": \"San Fra"
  }
}
```

> **注意**：`partial_json` 是部分 JSON 片段，不是完整的可解析 JSON。客户端应累积所有片段，在收到对应 `content_block_stop` 后再解析完整 JSON。

#### 3.3 `thinking_delta` — 思考过程增量

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"thinking_delta"` | 思考增量标识 |
| `thinking` | `string` | 思考过程的增量文本片段 |

```json
event: content_block_delta
data: {
  "type": "content_block_delta",
  "index": 0,
  "delta": {
    "type": "thinking_delta",
    "thinking": "I need to find the GCD of 1071 and 462..."
  }
}
```

#### 3.4 `signature_delta` — 思考签名增量

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"signature_delta"` | 签名增量标识 |
| `signature` | `string` | 思考块的完整性验证签名，仅在 thinking 块结束前发送 |

```json
event: content_block_delta
data: {
  "type": "content_block_delta",
  "index": 0,
  "delta": {
    "type": "signature_delta",
    "signature": "EqQBCgIYAhIM1gbcDa9GJwZA2b3hGgxBdjrkzLoky3dl1pk..."
  }
}
```

#### 3.5 `citations_delta` — 引用增量

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"citations_delta"` | 引用增量标识 |
| `citation` | `TextCitation` | 引用信息对象 |

**`citation` 的可能类型：**

| 引用类型 | `type` 值 | 关键字段 |
|----------|-----------|----------|
| 字符位置引用 | `"char_location"` | `cited_text`, `document_index`, `document_title`, `start_char_index`, `end_char_index`, `file_id` |
| 页码位置引用 | `"page_location"` | `cited_text`, `document_index`, `document_title`, `start_page_number`, `end_page_number`, `file_id` |
| 内容块位置引用 | `"content_block_location"` | `cited_text`, `document_index`, `document_title`, `start_block_index`, `end_block_index`, `file_id` |
| Web 搜索结果引用 | `"web_search_result_location"` | `cited_text`, `encrypted_index`, `title`, `url` |
| 搜索结果引用 | `"search_result_location"` | `cited_text`, `search_result_index`, `source`, `title`, `start_block_index`, `end_block_index` |

---

### 4. `content_block_stop`

标记特定内容块传输结束。

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"content_block_stop"` | 事件类型标识 |
| `index` | `number` | 结束的内容块索引 |

```json
event: content_block_stop
data: {
  "type": "content_block_stop",
  "index": 0
}
```

---

### 5. `message_delta`

消息级别的更新事件，包含最终的停止原因和累计 token 统计。

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"message_delta"` | 事件类型标识 |
| `delta` | `MessageDelta` | 消息级别的变更数据 |
| `usage` | `Usage` | **累计的** output token 计数 |

**`delta` 对象字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `stop_reason` | `StopReason` | 停止原因，见下方枚举值 |
| `stop_sequence` | `string \| null` | 触发停止的自定义序列（如有） |

**`stop_reason` 枚举值：**

| 值 | 说明 |
|----|------|
| `"end_turn"` | 模型自然结束生成 |
| `"max_tokens"` | 达到 `max_tokens` 上限或模型最大值 |
| `"stop_sequence"` | 匹配到自定义 `stop_sequences` |
| `"tool_use"` | 模型调用了一个或多个工具 |
| `"pause_turn"` | 长时间运行的回合被暂停，可将响应原样发回以继续 |
| `"refusal"` | 流式分类器介入处理潜在的策略违规 |

**`usage` 对象字段（message_delta 中）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `output_tokens` | `number` | 累计输出 token 数量 |

```json
event: message_delta
data: {
  "type": "message_delta",
  "delta": {
    "stop_reason": "end_turn",
    "stop_sequence": null
  },
  "usage": {
    "output_tokens": 15
  }
}
```

---

### 6. `message_stop`

流的最后一个事件，标志整个响应流结束。

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"message_stop"` | 事件类型标识 |

```json
event: message_stop
data: {
  "type": "message_stop"
}
```

---

### 7. `ping`

保活事件，可能在流中任意时刻出现，不包含业务数据。

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"ping"` | 事件类型标识 |

```json
event: ping
data: {
  "type": "ping"
}
```

---

### 8. `error`

流中的错误事件，例如服务过载时发送。

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `"error"` | 事件类型标识 |
| `error` | `ErrorObject` | 错误详情 |

**`error` 对象字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | `string` | 错误类型，如 `"overloaded_error"` |
| `message` | `string` | 错误描述信息 |

```json
event: error
data: {
  "type": "error",
  "error": {
    "type": "overloaded_error",
    "message": "Overloaded"
  }
}
```

---

## 三、完整流式响应内容块类型一览

以下是流式响应中 `content` 数组可能包含的所有内容块类型：

| 内容块类型 | `type` 值 | 说明 | 对应的 delta 类型 |
|-----------|-----------|------|-------------------|
| 文本块 | `"text"` | 普通文本响应 | `text_delta`, `citations_delta` |
| 思考块 | `"thinking"` | 扩展思考过程 | `thinking_delta`, `signature_delta` |
| 已编辑思考块 | `"redacted_thinking"` | 被编辑的思考内容 | — |
| 工具调用块 | `"tool_use"` | 客户端工具调用 | `input_json_delta` |
| 服务端工具调用块 | `"server_tool_use"` | 服务端工具调用 | `input_json_delta` |
| Web 搜索结果块 | `"web_search_tool_result"` | Web 搜索返回结果 | — |
| Web 抓取结果块 | `"web_fetch_tool_result"` | Web 抓取返回结果 | — |
| 代码执行结果块 | `"code_execution_tool_result"` | 代码执行返回结果 | — |
| Bash 代码执行结果块 | `"bash_code_execution_tool_result"` | Bash 执行返回结果 | — |
| 文本编辑器执行结果块 | `"text_editor_code_execution_tool_result"` | 文本编辑器执行结果 | — |
| 工具搜索结果块 | `"tool_search_tool_result"` | 工具搜索返回结果 | — |
| 容器上传块 | `"container_upload"` | 容器文件上传响应 | — |

---

## 四、`caller` 字段说明

`tool_use` 和 `server_tool_use` 块中的 `caller` 字段标识工具调用的来源：

| 类型 | `type` 值 | 说明 |
|------|-----------|------|
| `DirectCaller` | `"direct"` | 模型直接调用 |
| `ServerToolCaller` | `"code_execution_20250825"` | 由服务端代码执行工具触发的子调用 |
| `ServerToolCaller20260120` | `"code_execution_20260120"` | 由新版代码执行工具（带 REPL 持久化）触发的子调用 |

---

## 五、典型流式响应示例

### 示例 1：纯文本响应

```
event: message_start
data: {"type":"message_start","message":{"id":"msg_abc123","type":"message","role":"assistant","content":[],"model":"claude-opus-4-6","stop_reason":null,"stop_sequence":null,"usage":{"input_tokens":25,"output_tokens":1}}}

event: content_block_start
data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Hello"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":", I'm Claude."}}

event: content_block_stop
data: {"type":"content_block_stop","index":0}

event: message_delta
data: {"type":"message_delta","delta":{"stop_reason":"end_turn","stop_sequence":null},"usage":{"output_tokens":15}}

event: message_stop
data: {"type":"message_stop"}
```

### 示例 2：带扩展思考的响应

```
event: message_start
data: {"type":"message_start","message":{...}}

event: content_block_start
data: {"type":"content_block_start","index":0,"content_block":{"type":"thinking","thinking":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"thinking_delta","thinking":"Let me analyze..."}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"signature_delta","signature":"EqQBCgIYAh..."}}

event: content_block_stop
data: {"type":"content_block_stop","index":0}

event: content_block_start
data: {"type":"content_block_start","index":1,"content_block":{"type":"text","text":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"text_delta","text":"Based on my analysis..."}}

event: content_block_stop
data: {"type":"content_block_stop","index":1}

event: message_delta
data: {"type":"message_delta","delta":{"stop_reason":"end_turn","stop_sequence":null},"usage":{"output_tokens":50}}

event: message_stop
data: {"type":"message_stop"}
```

---

## 六、注意事项

1. **向前兼容**：未来可能添加新的事件类型，客户端代码应优雅地忽略未知事件类型。
2. **工具输入延迟**：模型每次只生成工具 `input` 中的一个完整键值对，因此使用工具时流事件之间可能有延迟。
3. **JSON 累积**：`input_json_delta` 中的 `partial_json` 是不完整的 JSON 片段，不可单独解析。需累积所有片段后在 `content_block_stop` 时解析。
4. **token 计量**：`message_start` 中的 `usage` 是初始值；`message_delta` 中的 `usage.output_tokens` 是最终累计值。总输入 token = `input_tokens` + `cache_creation_input_tokens` + `cache_read_input_tokens`。
5. **stop_reason 时序**：在 `message_start` 事件中 `stop_reason` 始终为 `null`，最终值通过 `message_delta` 事件返回。
