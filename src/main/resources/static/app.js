let allRolesArr = [];

jQuery(function ($) {       // $(document).ready(function(){

    console.log('Start app 313 (app.js) =============');
    // Базовое HTML приложения

    var app_html = `
                        
            <!-- здесь будет показано содержимое navbar-->
            <div id='navbar-content'></div>
            
            <!-- здесь будет показано содержимое приложения-->
            <div id='page-content'></div>
        `;

    // вызов функции navbarFilling()
    navbarFilling();

    // получение списка всех сущетвующих в БД ролей
    getAllRolesList();

    // вставка кода на страницу
    $("#app").html(app_html);

});

// Function navbarFilling() начало ------------------------------------------------
function navbarFilling() {
    console.log('Function navbarFilling() app.js ===============');
    $.getJSON("/api/user/", function (data) {
        let roles = [];
        for (let i = 0; i < data.roles.length; i++) {
            roles.push(data.roles[i].role);
        }
        let rolesList = roles.join(', ');

        let navbar_html = `
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
                    <span>
                        <span class="navbar-brand font-weight-bold">${data.name}</span>
                        <span class="navbar-brand font-weight-regular">with roles: ${rolesList}</span>

                    </span>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <small><a class="nav-link" href="/logout">Logout</a></small>
                        </li>
                    </ul>
                </nav>`;

        // вставка в 'navbar-content'
        $("#navbar-content").html(navbar_html);
    });
}
// Function navbarFilling() конец ----------------------------------------------

function getAllRolesList() {
    $.getJSON("/api/users/new", function (data) {
        for (let i = 0; i < data.roles.length; i++) {
            allRolesArr.push(data.roles[i].role);
        }
        console.log(allRolesArr);
    });
};