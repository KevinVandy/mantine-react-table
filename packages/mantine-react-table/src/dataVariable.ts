export function dataVariable(
  name: string,
  value: boolean | number | string | undefined,
) {
  const key = `data-${name}`;
  switch (typeof value) {
    case 'boolean':
      return value ? { [key]: '' } : null;
    case 'number':
      return { [key]: `${value}` };
    case 'string':
      return { [key]: value };
    default:
      return null;
  }
}
