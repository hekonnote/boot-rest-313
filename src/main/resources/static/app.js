jQuery(function ($) {       // $(document).ready(function(){

    console.log('Start app 313 (app.js) =============');
    // HTML приложения
    // var app_html = `
    //     <div class='container'>

    //     </div>`;

    var app_html = `
<!--            <div class='page-header'>-->
<!--                <h1 id='page-title'>Users</h1>-->
<!--            </div>-->
                        
            <!-- здесь будет показано содержимое navbar-->
            <div id='navbar-content'></div>
            
            <!-- здесь будет показано содержимое приложения-->
            <div id='page-content'></div>
        `;

    // вставка кода на страницу
    $("#app").html(app_html);

    // вызов функции navbarFilling()
    navbarFilling();
});

// функция navbarFilling() начало ------------------------------------------------
function navbarFilling() {
    console.log('функция navbarFilling() app.js ===============');
    $.getJSON("/api/user/", function (data) {
        let rolesArr = [];
        for (let i = 0; i < data.roles.length; i++) {
            rolesArr.push(data.roles[i].role);
        }
        let rolesList = rolesArr.join(', ');

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
// функция navbarFilling() конец ----------------------------------------------

// функция изменения заголовка страницы
function changePageTitle(page_title) {

    // измение заголовка страницы
    $('#page-title').text(page_title);

    // измение заголовка вкладки браузера
    document.title = page_title;
}

// функция создания значений формы в формате json
$.fn.serializeObject = function () {
    console.log('serialize ===========')
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};