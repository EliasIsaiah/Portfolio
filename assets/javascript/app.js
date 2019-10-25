$(document).ready(function () {

    let interval = null;

    //repository object class made for ease of retrieving and shaping data from github's api
    class RepoObject {
        constructor(object) {
            this.name = object.name;
            this.description = object.description;
            this.url = object.html_url;

            if (this.description === null) {
                this.description = "No Description";
            }
        }

        buildRepoDOM() {
            let newRepoDiv = $("<div>").addClass("repoDiv opaqueOnMobile");
            let name = $("<p>").text(this.name).addClass("repoName");
            let description = $("<p>").text(this.description).addClass("repoDescription");
            // let deployedP = $("<p>").text("Deployed");
            // let deployedURL = $("<a>").attr("href", `https://eliasisaiah.github.io/${this.name}`).append(deployedP);
            let urlP = $("<p>").text("GitHub");
            let gitHubURL = $("<a>").attr("href", this.url).append(urlP);
            $("div.repoContainer").append(newRepoDiv.append(name, description, gitHubURL));
        }
    }

    const utilities = {
        wordInterval: null,
        mouseCounter: 0,
        arrayCounter: 0,

        getRandom: function (min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },

        changeText: function (object) {
            $this.children().text($this.attr("data-hello"));
        },
        checkArrayData: function () {

            if (this.mouseCounter >= helloHeader.words[this.arrayCounter].length) {
                this.mouseCounter = 0;
                this.arrayCounter++
                if (this.arrayCounter >= helloHeader.words.length) {
                    this.arrayCounter = 0;
                }
                // wordInterval = setInterval(, 10000);
                // this.wordInterval = setInterval(helloHeader.buildHelloHeaderDOM(), 2000);
                clearInterval();

                // helloHeader.buildHelloHeaderDOM();
                interval = setInterval(() => {
                    helloHeader.buildHelloHeaderDOM();
                }, 2000);

            }
        },
    }


    const helloHeader = {

        words: [
            ["My", "name", "is", "Elias"],
            // ["My", "name", "is", "Elias"],
            ["The", "cake", "is", "a lie"],
            ["You must", "go to", "the dagobah", "system"],
            ["yippee", "ki", "yay", "cinnamon toast crunch"],
            ["Lions", "tigers", "bears", "oh my"],
            // ["Are", "you", "still", "reading this?"],
            // ["I'm", "running", "out", "of ideas"],
            ["Now is the time", "for all good men", "to come to the aid", "of the party"],
            // ["In the mornings", "when I'm usually wide awake", "I love to take a walk through the gardens and down by the lake", "where I often see a duck and a drake", "and I wonder, as I walk by, just what they'd say", "if they could speak", "although I know that's an absurd thought." ]
        ],

        buildHelloHeaderDOM: function () {

            $("div.helloHeader").empty();

            this.words[utilities.arrayCounter].forEach(word => {
                let helloDiv = $("<div>")
                    .attr("data-word", word)
                    .addClass("helloDiv opaqueOnMobile")

                pulseInterval = setInterval(() => {
                    helloDiv.addClass("animated pulse");
                }, 1000);

                clearInterval(interval);

                helloDiv.attr("data-hello", "Hello");
                let helloP = $("<p>").text("Hello");

                helloDiv.on("mouseenter", function () {
                    $this = $(this);
                    $this.children().text($this.attr("data-word"));
                });

                helloDiv.on("mouseleave", function () {
                    $this = $(this);
                    utilities.mouseCounter++;
                    console.log("counter: " + utilities.mouseCounter);
                    $this.off();
                    utilities.checkArrayData();
                });

                helloDiv.append(helloP);
                $("div.helloHeader").append(helloDiv);

                // clearInterval(pulseInterval);


            })
        },
    }

    $.ajax({
        method: "GET",
        url: "https://api.github.com/users/eliasisaiah/repos",
        dataType: "jsonp",
    }).then(reposObject => {
        reposObject.data.map(repo => {
            let repoObj = new RepoObject(repo);
            repoObj.buildRepoDOM();
        })
    }).catch(error => $("div.repoContainer").text("Failed to load GitHub API")
    )

    helloHeader.buildHelloHeaderDOM();
})