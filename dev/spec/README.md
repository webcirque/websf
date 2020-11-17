# WEBSF.Spec
JavaScript library support for living standards and self created standards!

## Subtitles
Library for parsing, editing and rendering subtitles. Use its features by creating a <code>Subtitles(_text_)</code> object.

### Formats
#### LRC / TRC
LRC is the most widely used open lyrics format, with enhanced version exist. Supported in the older version of **WEBSF.Spec.Subtitles**.

TRC is also a open format authored by TTPod(originally named 天天动听, then it renamed to 阿里星球), which is based on LRC.

Vanilla LRC does not support timing, while enhanced LRC and TRC adds timing to it.

Enhanced LRC adds timing data after each unit, while TRC adds prior to each unit.

#### CXL
CXL stands for Compact eXtended Lyrics, which is a lyrics format designed to split and minimize processing work. Not yet supported.

This format is designed by us (originally EdChdX), with ease of collaboration in mind. The first CXL file is by Mu_guang_138 and EdChdX.

It is not backwards compatible with good old LRC. Supports timings and basic styling.

#### KRC
Proprietary lyrics format. Supports timings. Will add support to automatically decide if the file needs to be decoded.

The file needs to be first decoded repeatedly for each byte by using XOR with this data before parsing: <code>new UInt8Array.from([64, 71, 97, 119, 94, 50, 116, 71, 81, 54, 49, 45, 206, 210, 110, 105])</code>. Then it requires to decompress as GZIP. The original file will then be exposed.

#### SRT / WebVTT
The most widely used plain subtitles format. Supported in the older version of **WEBSF.Spec.Subtitles**.

#### SSA / ASS
One of the most powerful subtitle format. Supported in the older version of **WEBSF.Spec.Subtitles**.

#### SMI(SAMI)
A open subtitles format. Description [here](https://en.wikipedia.org/wiki/SAMI).

#### VobSub (.sub and .idx)
One of the oldest picture-based subtitle format. Not yet supported.

#### EBU STL
_PS: Not guaranteed to support this format, but we will try our best._

A picture-based subtitle format developed by European Broadcasting Union. Description file (PDF) [here](https://tech.ebu.ch/docs/tech/tech3264.pdf)

### Object Structure
Redesigning the manipulation structure to make it as universal as possible.

For older structure, please click [here](https://github.com/webcirque/websf/blob/49f53992611378e18197c0e9fb7d65574eb3db2b/dev/spec/README.md).

## Sheet
Library for working with spreadsheets, like _CSV_, _TSV_, _Markdown_, _Fielded Text_ and _DIF_.

### Object Structure
Redesigning the manipulation structure to make it as universal as possible.

## Properties
Library for property declaration languages, like _Properties_, _TOML_ and _LANG_.

### Object Structure
Designing the manipulation structure to make it as universal as possible.
