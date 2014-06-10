// Fix console for IE, lolz, now
if (!window.console) {
  window.console = {};
  [
    "log","info","warn","error","assert","dir","clear","profile","profileEnd"
  ].forEach(function (method) {
      window.console[method] = function() {};
  });
}

// From: http://stackoverflow.com/a/5539378
if (Function.prototype.bind && window.console && typeof console.log == "object"){
    [
      "log","info","warn","error","assert","dir","clear","profile","profileEnd"
    ].forEach(function (method) {
      console[method] = this.bind(console[method], console);
    }, Function.prototype.call);
}


