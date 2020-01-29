function loadScriptSync(src) {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = false;
    document.getElementsByTagName('head')[0].appendChild(script);
}
