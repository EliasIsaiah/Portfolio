$(document).ready(function () {

    //global vars

    let mouseCounter = 0;
    let arrayCounter = 0;

    class repoObject {
        constructor(object) {
            this.name = object.name;
            this.description = object.description;
            this.url = object.html_url;

            if (this.description === null) {
                this.description = "No Description";
            }
        }

        buildRepoDOM() {
            let newRepoDiv = $("<div>").addClass("repoDiv");
            let name = $("<p>").text(this.name).addClass("repoName");
            let description = $("<p>").text(this.description).addClass("repoDescription");
            let urlP = $("<p>").text(this.url);
            let url = $("<a>").attr("href", this.url).append(urlP);
            $("div.repoContainer").append(newRepoDiv.append(name, description, url));
        }
    }

    const utilities = {
        getRandom: function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }

    function checkArrayData() {
        
        if(mouseCounter >= helloHeader.words[arrayCounter].length){
            mouseCounter = 0;
            arrayCounter++
            if(arrayCounter >= helloHeader.words.length){
                arrayCounter = 0;
            }
            helloHeader.buildHelloHeaderDOM();
        } 
    }

    helloHeader = {
        words: [
            ["My", "name", "is", "Elias"],
            ["The", "cake", "is", "a lie"],
            ["carpe", "diem"],
            ["I", "am", "the", "senate"],
            ["yippee", "ki", "yay", "cinnamon toast crunch"],
            ["Lions", "tigers", "bears", "oh my"],
            ["Are", "you", "still", "reading this?"],
            ["I'm", "running", "out", "of ideas"],
            ["Now is the time", "for all good men", "to come to the aid", "of the party"],
            ["In the mornings", "when I'm usually wide awake", "I love to take a walk through the gardens and down by the lake", "where I often see a duck and a drake", "and I wonder, as I walk by, just what they'd say", "if they could speak", "although I know that's an absurd thought." ]
        ],

        buildHelloHeaderDOM: function () {

            $("div.helloHeader").empty();

            this.words[arrayCounter].forEach(word => {
                let helloDiv = $("<div>")
                    .attr("data-word", word)
                    .addClass("helloDiv animated pulse")
                    .css({
                        'animation-duration': `${utilities.getRandom(2, 5)}s`,
                        'animation-delay': '3s',
                        'animation-iteration-count': 'infinite'
                    })

                helloDiv.attr("data-hello", "Hello");
                let helloP = $("<p>").text("Hello");

                helloDiv.on("mouseenter", function () {
                    $this = $(this);
                    $this.children().text($this.attr("data-word"));
                });

                helloDiv.on("mouseleave", function () {
                    $this = $(this);
                    $this.children().text($this.attr("data-hello"));
                    mouseCounter++;
                    console.log("counter: " + mouseCounter);
                    $this.off();
                    checkArrayData();
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