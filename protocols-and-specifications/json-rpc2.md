## Json-RPC2.0

- [(译) JSON-RPC 2.0 规范(中文版)](https://wiki.geekdream.com/Specification/json-rpc_2.0.html)
- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)

请求对象包括四个成员：
- jsonrpc： 指定JSON-RPC协议版本的字符串，必须准确写为“2.0”
- method
- params
- id：唯一标识id，值必须包含一个字符串、数值或NULL空值。如果不包含该成员则被认定为是一个通知。该值一般不为NULL，若为数值则不应该包含小数。

应答对象包括四个成员：
- jsonrpc
- result
- error
- id
