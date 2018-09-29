import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosInstance,
    AxiosAdapter,
    Cancel,
    CancelToken,
    CancelTokenSource,
    Canceler
} from "../../node_modules/axios";

// https://github.com/axios/axios/blob/master/test/typescript/axios.ts
// attributes from REST service http://jsonplaceholder.typicode.com/comments
// simple object
interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

let listContent: HTMLDivElement = <HTMLDivElement>document.getElementById("listcontent");

axios.get<IComment>("http://jsonplaceholder.typicode.com/comments").
    then(function (response: AxiosResponse<IComment[]>): void {
        // outputElement.innerHTML = JSON.stringify(response.data);
        // generateAndShowLongHtmlString(response);
        addToDOM(response);
    })
    .catch(function (error: AxiosError): void {
        console.log(JSON.stringify(error));
    });

function generateAndShowLongHtmlString(response: AxiosResponse<IComment[]>): void {
    let result: string = "<ol>";
    response.data.forEach((comment: IComment) => {
        console.log(comment.email);
        result += "<li>" + comment.name + "</li>";
    });
    result += "</ol>";
    listContent.innerHTML = result;
}

let detailContent: HTMLDivElement = <HTMLDivElement>document.getElementById("detailcontent");
let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deletebutton");

// add to the DOM dynamically, incl event handler
function addToDOM(response: AxiosResponse<IComment[]>): void {
    let olElement: HTMLOListElement = document.createElement<"ol">("ol");
    listContent.appendChild(olElement);
    response.data.forEach((comment: IComment) => {
        let liElement: HTMLLIElement = document.createElement<"li">("li");
        liElement.innerHTML = comment.name;
        olElement.appendChild(liElement);

        // tooltip effect, not implemented (yet)
        // https://www.w3schools.com/css/tryit.asp?filename=trycss_tooltip
        liElement.addEventListener("click", () => {
            console.log(comment.email);
            // text string!
            detailContent.innerHTML = comment.email + "<br /> " + comment.body;
            liElement.style.backgroundColor = "red"; // how to unset color?
            deleteButton.style.display = "block";
            deleteButton.addEventListener("click", () => {
                deleteComment(comment.id);
            });
        });
    });
}

function deleteComment(id: number): void {
    let deleteUri: string = "http://jsonplaceholder.typicode.com/comments/" + id;
    axios.delete(deleteUri).
        then(function (response: AxiosResponse<IComment[]>): void {
            console.log(JSON.stringify(response));
        })
        .catch(function (error: AxiosError): void {
            console.log(JSON.stringify(error));
        });
}