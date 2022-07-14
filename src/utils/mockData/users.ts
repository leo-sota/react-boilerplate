import mock from "../axios/mock";

mock.onGet("/api/v1/users").reply(() => {
    const data = localStorage.getItem("users");
    if (data) {
        return [200, JSON.parse(data)];
    } else {
        localStorage.setItem("users", JSON.stringify([]));
        return [200, []];
    }
});
