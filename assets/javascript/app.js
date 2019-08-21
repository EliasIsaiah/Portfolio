$(document).ready(function () {

    class repoObject {
        constructor(object) {
            this.name = object.name;
            this.description = object.description;
            this.url = object.html_url;

            if(this.description === null) {
                this.description = "No Description";
            }
        }

        buildRepoDOM() {
            let newRepoDiv = $("<div>").addClass("repoDiv");
            let name = $("<p>").text(this.name);
            let description = $("<p>").text(this.description);
            let urlP = $("<p>").text(this.url);
            let url = $("<a>").attr("href", this.url).append(urlP);
            $("div.repoContainer").append(newRepoDiv.append(name, description, url));
        }
    }

    helloHeader = {
        words: ["My", "name", "is", "Elias"],

        buildHelloHeaderDOM: function(){

            $("div.helloHeader").empty();

            this.words.forEach(word => {
                let helloDiv = $("<div>")
                .attr("data-word", word)
                .addClass("helloDiv");

                helloDiv.attr("data-hello", "Hello");
                let helloP = $("<p>").text("Hello");

                helloDiv.on("mouseenter", function() {
                    $this = $(this);
                    $this.children().text($this.attr("data-word"));
                });

                helloDiv.on("mouseleave", function() {
                    $this = $(this);
                    $this.children().text($this.attr("data-hello"));
                });
                helloDiv.append(helloP);
                $("div.helloHeader").append(helloDiv);
            })
        },
    }

    $.ajax({
        method: "GET",
        url: "https://api.github.com/users/eliasisaiah/repos",
        dataType: "jsonp",
    }).then(reposObject => {
        reposObject.data.forEach(repo => {
            let repoObj = new repoObject(repo);
            repoObj.buildRepoDOM();
            console.log(repoObj);
        })
    })

    helloHeader.buildHelloHeaderDOM();  
})