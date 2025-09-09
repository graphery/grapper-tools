export const title       = '6) interpolation'
export const description = `Display the current origin & port`;

export default `
<div>${ window.location.origin }</div>
<div>${ window.location.port }</div>
`;