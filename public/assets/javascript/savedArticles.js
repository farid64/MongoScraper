$(document).ready(function() {
	
	const savedArticleContainer = $(".article-container-saved");
	const modalNotes = $(".notes-container");
	const noteToSave = $("#note-to-save");

	$(document).on('click', "#deleteBtn", deleteArticle);
	$(document).on('click', "#noteBtn", openNote);
	$(document).on('click', ".saveNote", saveNote);
	$(document).on('click', "#deleteNote", deleteNote);


	initializePage();


function initializePage() {

	$(".saved").addClass("active");
	$(".home").removeClass("active");
   
    savedArticleContainer.empty();

    $.get("/api/headlines/" + "true").then(function(data) {
      
      if (data && data.length) {
        renderArticles(data);
      }
      else {
        renderEmpty();
      }
    });
}

function renderEmpty() {

  const container = $("<div>").addClass("panel panel-default");
  const heading = $("<div>").addClass("panel-heading");
  heading.text("No content");
  const content = $("<div>").addClass("panel-body");
  content.text("There seems to be no article to show here");
  container.append(heading);
  container.append(content);

  articleContainer.append(container);
  
};

function renderArticles(data){

  data.forEach( function(item){
    const container = $("<div>").addClass("panel panel-default");
    const heading = $("<div>").addClass("panel-heading");

      const headingTitle = $("<h3>").addClass("panel-title");
      const headingURL = $("<a>").attr("href", item.URL);
      headingURL.text(item.headline);
      headingTitle.append(headingURL);

    heading.append(headingTitle);

      const delBtn = $("<button>").addClass("btn btn-danger");
      delBtn.attr("id", "deleteBtn");
      delBtn.text("delete from saved");
      delBtn.data("_id", item._id);

      const ntBtn = $("<button>").addClass("btn btn-info");
      ntBtn.attr("id", "noteBtn");
      ntBtn.text("Notes");
      ntBtn.data("_id", item._id);

    heading.append(delBtn);
    heading.append(ntBtn);

    const content = $("<div>").addClass("panel-body");
      if(item.summary !== ""){
        content.text(item.summary);
      }else{
        content.text("No summary was provided");
      };

    container.append(heading);
    container.append(content);

    savedArticleContainer.append(container);
  });
};

function deleteArticle(){

  console.log($(this).data("_id"));
  const id_option = {"id": $(this).data("_id"), "saved": false};

  $.post("/api/headlines", id_option).then( function(data){
    if(data && data.length){
      console.log("article deleted : " + data);
    };
    initializePage();
  });

};

function openNote(){

	const id = $(this).data("_id");

	$("#noteModal").modal("show");
	$(".saveNote").data("_id", id);

	modalNotes.empty();
	$.get("/api/notes/" + id).then( function(data){
		if(data && data.length){
			renderNotes(data, id);
		}
		else{
			renderEmptyForNotes();
		};

	})
};

function renderNotes(data, id){

	data[0].notes.forEach( function(item){

		const container = $("<div>").addClass("panel panel-default");
		const content = $("<div>").addClass("panel-body");
		content.text(item);

		container.append(content);

		const delBtn = $("<button>").addClass("btn btn-danger");
		delBtn.text("X");
		delBtn.attr("id", "deleteNote");
		delBtn.data({_id: id, text: item});

		container.append(delBtn);

		modalNotes.append(container);

	});
};

function renderEmptyForNotes(){

	const container = $("<div>").addClass("panel panel-default");
	const content = $("<div>").addClass("panel-body");
	content.text("No notes to show");

	container.append(content);

	modalNotes.append(container);
};

function saveNote(){
	const noteText = noteToSave.val();
	const id_note = {"id": $(this).data("_id"), "note": noteText};

	$.post("/api/notes", id_note).then( function(data){
		if(data && data.length){
			console.log(data);
		};

		$("#noteModal").modal("hide");
	});
};

function deleteNote(){
	const id = $(this).data("_id");
	const text = $(this).data("text");

	$.ajax({
		method: "DELETE",
		url: "/api/notes/" + id,
		data: {"text": text}
	}).then( function(data){
		if(data && data.length){
			console.log(data);
		};

		$("#noteModal").modal("hide");
	});

	console.log(id, text);
};



});