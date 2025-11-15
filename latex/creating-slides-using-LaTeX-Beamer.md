# 使用 LaTeX + Beamer 创建PPT

## 背景

### 1. **Beamer 是什么，为什么用 Beamer？**

LaTeX：基于TeX的排版系统，以代码形式编写文档，擅长数学公式、学术排版。
Beamer：LaTeX的一个宏包，专门用于生成结构化的幻灯片（类似PPT），输出为PDF。Beamer 的主题大方简洁，非常适合用作学术汇报和晋升述职。

一些文档：

- [这是 beamer 的官方主题](https://hartwork.org/beamer-theme-matrix/)
- [overleaf网站提供的 Beamer主题，大多开源](https://www.overleaf.com/latex/templates/tagged/presentation)
- [Beamer Github源码](https://github.com/josephwright/beamer)
- [从零开始用beamer做学术报告幻灯片](https://alexander-qi.github.io/2019/teachbeamer/)
- [技术大佬潘伟洲 的一些课件作品。大多使用 LaTeX + Beamer 制作](https://github.com/wzpan/wzpan.github.io/wiki/slides)

### 2. 怎么使用 Beamer

- 安装 LaTex + Beamer 基础工具：TeX Live，需要的安装体积比较大，约6GB， 官网：https://tug.org/texlive/
- 安装 Beamer 可视化编辑器，常用编辑器，如：TeXworks、TeXstudio、Visual Studio Code插件：LaTeX Workshop。 这里推荐 [TeXstudio](https://texstudio.sourceforge.net/) ,TeXstudio 是C++实现的开源工具，[Git仓库地址](https://github.com/texstudio-org/texstudio/)

### 3. LaTex pdfLaTex XeLaTex和luaLaTex 区别

安装完 TeX Live 后，会发现本地多了一些 *latex 命令行工具，这些工具有什么区别呢？

大概是这样，很久以前有人写了个Tex排版引擎，输入一些代码命令，输出dvi文件（设备无关文件），但这个太难用了，就像汇编一样，非得专家来写不可，于是有人在这个基础上封装了一套宏，叫做LaTex，用\section、\begin{document}等内容来简化操作，久而久之就变成了一套标准，管你底下Tex怎么实现，你向上提供的接口是一样的，就像是不同的C语言编译器底下可能有不同的实现，但我写的C语言的代码语法格式都是一样的。

然后原始的Tex引擎输出dvi文件（设备无关文件），后来有人改了下这个Tex引擎，使得其能够直接输出pdf文件，更加方便更加现代，这个引擎叫做pdfTex，配合LaTex那套宏（语法标准）变成了pdfLaTex，可以理解为C语言的语法标准不变，写的代码格式什么的不变，只是底下的编译器变了，不再输出.o文件，而是一步到位输出exe或者dll等文件，当然，具体到pdfLaTex上可能还有些别的细节，但主要的区别就是这个。

后来有人觉得pdfLaTex没法混排不同的语言文字（不原生支持UTF-8），于是又改了下Tex引擎，变成了XeTex，配合LaTex那套宏变成了XeLaTex，能够支持包括中文在内的各种语言，原生支持中文，能够调用系统里的原生字体等等。

再后来有了更加复杂的排版需求，如一些动态特性或者高度自定义的需求等等，有人同样改了下Tex引擎，配合LaTex变成了luaLaTex，能够插入lua脚本，做一些很定制化的内容，同样因为需要解析脚本，所以编译速度也比较慢。

需要注意以下几点：

- LaTex是原始Tex引擎之上包装的一层宏语言，并非什么实体内容，算是一种标准。
- pdfLaTex、XeLaTex和luaLaTex都是修改了底层的Tex引擎，LaTex这套标准大家一直沿用。
- LaTex和pdfLaTex虽然无法支持多语言混排，但是对一些古老的宏包支持比较好，兼容性比较好。

这几种编译器并非递进关系，而是并排关系，均是出自不同需求的分支，因此在实际项目选择编译器的时候不要无脑选择最新的，而是根据实际需求选择。一般国外的期刊会议论文文章都选择LaTex或者pdfLaTex，国内的论文或者需要多语言混排的论文选择XeLaTex，需要高度自定义排版需求（如绘图）以及OpenType高级特性的选择luaLaTex。

编译速度：pdfLaTex > XeLaTex > luaLaTex。

### 4. Beamer 主题模板

如果从 0 开始编写Beamer 文档，难度很大。因此，Beamer 内置了很多主题模板，我们可以引用这些主题进行编写：

```
\usecolortheme{rose}
```

这里的 rose ，即为主题名称。TeX Live 内置了很多主题，默认内置主题文件在 Mac 上通过以下命令查看：

```
ls   /usr/local/texlive/2022/texmf-dist/tex/latex/beamer/*.sty

/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerarticle.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasearticle.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbaseauxtemplates.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbaseboxes.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasecolor.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasecompatibility.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasedecode.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasefont.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbaseframe.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbaseframecomponents.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbaseframesize.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbaselocalstructure.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasemisc.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasemodes.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasenavigation.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasenotes.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbaseoptions.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbaseoverlay.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbaserequires.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasesection.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasetemplates.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasethemes.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasetheorems.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasetitle.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasetoc.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasetranslator.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbasetwoscreens.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerbaseverbatim.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemealbatross.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemebeaver.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemebeetle.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemecrane.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemedefault.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemedolphin.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemedove.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemefly.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemelily.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthememonarca.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemeorchid.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemerose.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemeseagull.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemeseahorse.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemesidebartab.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemespruce.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemestructure.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemewhale.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamercolorthemewolverine.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerfoils.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerfontthemedefault.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerfontthemeprofessionalfonts.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerfontthemeserif.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerfontthemestructurebold.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerfontthemestructureitalicserif.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerfontthemestructuresmallcapsserif.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerinnerthemecircles.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerinnerthemedefault.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerinnerthemeinmargin.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerinnerthemerectangles.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerinnerthemerounded.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerouterthemedefault.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerouterthemeinfolines.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerouterthememiniframes.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerouterthemeshadow.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerouterthemesidebar.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerouterthemesmoothbars.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerouterthemesmoothtree.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerouterthemesplit.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerouterthemetree.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerpatchparalist.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerprosper.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerseminar.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamertexpower.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeAnnArbor.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeAntibes.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeBergen.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeBerkeley.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeBerlin.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeBoadilla.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeCambridgeUS.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeCopenhagen.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeDarmstadt.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeDresden.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeEastLansing.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeFrankfurt.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeGoettingen.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeHannover.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeIlmenau.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeJuanLesPins.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeLuebeck.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeMadrid.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeMalmoe.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeMarburg.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeMontpellier.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemePaloAlto.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemePittsburgh.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeRochester.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeSingapore.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeSzeged.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeWarsaw.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemebars.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeboxes.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeclassic.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemecompatibility.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemedefault.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemelined.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeplain.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemeshadow.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemesidebar.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemesplit.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/beamerthemetree.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/multimedia.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/multimediasymbols.sty
/usr/local/texlive/2022/texmf-dist/tex/latex/beamer/xmpmulti.sty
```

这个网站： https://hartwork.org/beamer-theme-matrix/ 提供了主题效果矩阵表，Beamer的行(AnnArbor)与列(albatross)分别对应着主题(AnnArbor)和配色(albatross)

overleaf网站中不乏一些国内科研院校分享的模版，如：

- [清华大学计算机系 THU Beamer Theme](https://www.overleaf.com/latex/templates/thu-beamer-theme/vwnqmzndvwyb)
- [中国原子能科学研究院Beamer模板](https://www.overleaf.com/latex/templates/zhong-guo-yuan-zi-neng-ke-xue-yan-jiu-yuan-beamermo-ban/cbxsfscsnjwb)
- [东北师大NENU-beamer-template](https://www.overleaf.com/latex/templates/dong-bei-shi-da-nenu-beamer-template/pjxbzdszjpsh)
- [厦门大学Beamer](https://www.overleaf.com/latex/templates/sha-men-da-xue-beamer/sckzzdghzxbh)

## TeXstudio 操作流程

### 1、设置支持中文

默认使用 latext 或者 pdflatex 进行编译，文档中有中文时会报错。确定进行下面设置：

- 在TeXstudio中设置使用XeLaTeX编译。进入“选项” > “设置TeXstudio”（或“设置”） > “构建”选项卡，将“默认编译器”设置为“XeLaTex”。
- 同时，为确保中文支持和避免乱码，建议在“编辑器”选项卡中将“默认字体编码”设置为“UTF-8”。 

### 2、基于一个已有的模版

- 参考：https://github.com/wzpan/BeamerStyleSlides/tree/master/benchmark

拷贝 slides.tex、tencent.jgp 到当前项目。

### 3. 安装依赖字体

slides.tex 中依赖了以下三种字体，下载并安装。

- [Adobe Kaiti Std](https://fontsgeek.com/adobe-kaiti-std-font)
- [Adobe Song Std](https://fontsgeek.com/adobe-song-std-font)
- [Adobe Heiti Std](https://fontsgeek.com/adobe-heiti-std-font)

在 Mac 上添加新字体，最简单的方法是双击字体文件，然后在弹出的预览窗口中点击“安装字体”。

您还可以打开“字体册”应用程序，点击菜单栏的“文件”>“添加字体”，然后选择您要安装的字体文件。 

## Beamer模板转 PPT

Beamer的缺点： 不支持直接插入视频。要播放视频，你需要先将视频转成帧图像，然后使用 animation 包来实现播放，而且只支持 Adobe Reader。体验非常糟糕。

为了让像我一样审美较差的码农也能用powerpoint/keynote做出媲美LaTeX Beamer的slides，成为一名合格的PPT工程师，轻松应对答辩晋升、技术分享和学术交流的任务，技术大佬潘伟洲开始了一个名为 BeamerStyleSlides 项目：对 Beamer 的更多官方主题进行复刻，并且在 Github 上开源：

- [BeamerStyleSlides](https://github.com/wzpan/BeamerStyleSlides)

这就是 BeamerStyleSlides 的由来。
