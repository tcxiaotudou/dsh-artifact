/** 服务端与浏览器共用原生解析和任务编译，不改写图表源码。 */
export async function validateMermaid(mermaid, code) {
  const diagram = await mermaid.mermaidAPI.getDiagramFromText(code)
  if (diagram.type === 'gantt') {
    try {
      // parse 只检查语法；getTasks 才编译任务日期与依赖，能够发现元数据错位。
      diagram.db.getTasks()
    } catch (error) {
      throw new Error('Invalid gantt task metadata. Use "task name : [tags,] [id,] start, end-or-duration" with tags first and 1–3 non-empty metadata items after the tags. '
        + 'Task names must not contain ASCII ":"; write displayed times as "16：22" or "16时22分". Keep ":" in date/time metadata matching dateFormat. '
        + `Mermaid: ${error && error.message ? error.message : String(error)}`)
    }
  }
  return diagram
}
