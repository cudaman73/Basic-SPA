import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/posts", view: Posts },
        { path: "/settings", view: Settings },
        
    ];

    //Create an array to mark which route we are currently on
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });
    //Return the first element of potentialMatches where .isMatch = true
    //this works because .find needs a bool true to return the element
    let match = potentialMatches.find(match => match.isMatch)

    //match can be undefined (if there is no route in the array), so we handle
    //that by creating a default route - if no match, we default to routes[0]
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();
    //now we create the new page state by calling getHtml() from the proper instance
    document.querySelector("#app").innerHTML = await view.getHtml();

};

//this reruns router when the pop state changes (when the user clicks back)
window.addEventListener("popstate",router);

//here we are catching the default behavior of our <a> links if they have the
//data-link tag - so that we can use our router instead of reloading the page
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});