(function ($) {
    let GITHUP_API = `https://api.github.com/repos/nshaibu/`;

    let GITHUP_REPO_NAMES = ["QBox", "shortcutVirusRemover", 
                            "ChatClient", "ConcurrentServer",
                            "TrimLabelImg", "PostfixExpressionAndEvaluation",
                            "Invoice-Management-System", "Market"
                        ];

    class Paginator {
        //My Custom Repo And Post Paginator (html5up.net)

        constructor(repos=[], num_on_page=10) {
            this.repos = repos;
            this.current_page = 1;
            this.paginated = false;
            this.repo_per_page = num_on_page;
            this.pages = []
        }

        paginate() {
            if (this.paginated) return;

            let count = 0, repo_name;
            let repo_name_array = []
            let repos = this.repos.map(x => x)

            for (let index=1; index <= this.repo_per_page; index++) {
                count = this.repo_per_page
                repo_name_array = []
                while (count > 0) {
                    try {
                        repo_name = repos.shift();
                        if (repo_name)
                            repo_name_array.push(repo_name);
                    } catch (e) {
                        console.log(e);
                        break;
                    }
                    count -= 1;
                }
                this.pages.push({"page_id": index, "repos": repo_name_array});
                if (repos.length === 0) break;
            }

            this.paginated = true;
        }

        page(page_num) {
            let res = this.pages.filter(x => x.page_id === page_num);
            return (res.length) ? res[0]:null;
        }

        goto(page_num) {
             if (page_num <= this.pages.length && page_num > 0) {
                 this.current_page = page_num;
                 return this.page(page_num)
             }
             return null
        }

        next() {
            if (this.current_page >= this.pages.length){
                this.current_page = 1;
                return this.page(this.current_page);
            } 
            this.current_page += 1;
            return this.page(this.current_page)
        }

        previous() { 
            if (this.current_page <= 1)
                return this.page(this.current_page);
            this.current_page -= 1; 
            return this.page(this.current_page)
        }

        static getGitHuhRepo(repoName, callback) {
            $.get({
                url: GITHUP_API + repoName,
                success: (data) => callback(data),
                dataType: 'json'
            })
            .fail(function(error) {
                console.log(error);
            });
        }
    }

    let paginator = new Paginator(repos=GITHUP_REPO_NAMES, 4);
    paginator.paginate();
    window.paginator = paginator;

    function drawProjectRepo(repoData){
        if (repoData === null) return;

        let repo = `
        <article>
			<header>
				<span class="date">${repoData.created_at}</span>
				<h2><a href="#">${repoData.name}</a></h2>
			</header>
			<p>${repoData.description}</p>
			<ul class="actions special">
				<li><a href="${repoData.html_url}" target="_blank" class="button">More</a></li>
			</ul>
        </article>`;
        $(repo).appendTo("#js-projects-section");
    }
    
    let firstPageObject = paginator.goto(1);
    

    if (firstPageObject) {
        $('#js-projects-section>article').remove();
        firstPageObject.repos.forEach(function(name) {
            Paginator.getGitHuhRepo(name, function (data) {drawProjectRepo(data);});
        });

        $('#js-prev-pagination-btn').click(function (event) {
            let btn = $(event.target);
            let pageObject = paginator.previous();
            if (pageObject) {
                $('#js-projects-section>article').remove();
                pageObject.repos.forEach(function (name) {
                    Paginator.getGitHuhRepo(name, function (data) {drawProjectRepo(data);});
                });
            }
        });

        $('#js-next-pagination-btn').click(function (event) {
            let btn = $(event.target);
            let pageObject = paginator.next();
            if (pageObject) {
                $('#js-projects-section>article').remove();
                pageObject.repos.forEach(function (name) {
                    Paginator.getGitHuhRepo(name, function (data) {drawProjectRepo(data);});
                });
            }
        });
    }

}(jQuery));