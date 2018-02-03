$(document).ready(function() {

    const articleContainer = $(".article-container");

    $(document).on('click', ".scrape-new", scrapeNew);
    $(document).on('click', "#saveBtn", saveNew);

    initializePage();


  function initializePage() {
     
      articleContainer.empty();

      $.get("/api/headlines/" + "false").then(function(data) {
        
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

        const button = $("<button>").addClass("btn btn-success");
        button.attr("id", "saveBtn");
        button.text("Save Article");
        button.data("_id", item._id);

      heading.append(button);

      const content = $("<div>").addClass("panel-body");
        if(item.summary !== ""){
          content.text(item.summary);
        }else{
          content.text("No summary was provided");
        };

      container.append(heading);
      container.append(content);

      articleContainer.append(container);
    });
  }

  function scrapeNew(){

    $.get('/api/fetch').then( function(data){
      console.log(data);
    });

    initializePage();

  }

  function saveNew(){
    const id_option = {"id": $(this).data("_id"), "saved": true};

    $.post("/api/headlines", id_option).then( function(data){
      if(data && data.length){
        console.log("saved article: " + data);
      };
      initializePage();
    })  
  };

});
