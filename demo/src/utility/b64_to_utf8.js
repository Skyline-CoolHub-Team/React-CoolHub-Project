const b64_to_utf8 = (str) => decodeURIComponent(escape(window.atob(str)))
export default b64_to_utf8
