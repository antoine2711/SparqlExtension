
Refine.SPARQLSourceUI = function(controller) {
  this._controller = controller;
};

Refine.SPARQLSourceUI.prototype.attachUI = function(body) {
  var self = this;
  this._body = body;
  
  this._body.html(DOM.loadHTML("sparql", "scripts/index/import-from-sparql-form.html"));
  this._elmts = DOM.bind(this._body);
  
  $('#or-import-sparql').text($.i18n('sparql-import/importer-label'));
  this._elmts.queryButton.html($.i18n('sparql-buttons/query'));
  
  this._elmts.queryButton.on('click',function(evt){
	var api = new wikibase.queryService.api.Sparql();
	var query = jQueryTrim($( "#sparql-import-textarea" ).val());
	api.query( query ).done(function(){
		var json = JSON.parse( api.getResultAsJson() );
		$("#sparql-import-textarea").val('');
		$("#sparql-import-textarea").val(JSON.stringify(json));
		$("#sparql-import-textarea").val(JSON.stringify(query));
		self._controller.startImportingDocument(json)
	});
});
  
};

Refine.SPARQLSourceUI.prototype.focus = function() {
};