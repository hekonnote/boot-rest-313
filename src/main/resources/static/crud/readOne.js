jQuery(function ($) {

    console.log('Start readOne.js =============')

    showOneUser();
});
//============================================================================

function showOneUser() {
    console.log('Function showOneUser() readOne.js ===============');
    $.getJSON("/api/user/", function (user) {
       let oneUser = user;
        console.log(oneUser + ' Юзер, полученный с бэка');
        let roles = [];
        for (let i = 0; i < oneUser.roles.length; i++) {
            roles.push(oneUser.roles[i].role);
        }
        let rolesList = roles.join(", ");
        console.log(rolesList + ' Список названий ролей юзера, полученного с бэка');

        let navbar_html = `
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
                    <span>
                        <span class="navbar-brand font-weight-bold">${oneUser.name}</span>
                        <span class="navbar-brand font-weight-regular">with roles: ${rolesList}</span>

                    </span>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <small><a class="nav-link" href="/logout">Logout</a></small>
                        </li>
                    </ul>
                </nav>`;

        // вставка html навбара в 'navbar-content-one-user'
        $("#navbar-content-one-user").html(navbar_html);

        // вставка значений в таблицу Юзер
        $('#oneUserId').text(oneUser.id);
        $('#oneUserName').text(oneUser.name);
        $('#oneUserAge').text(oneUser.age);

        // формирование html со списком ролей в таблицу Юзер
        let roles_html = "";
        for (let i = 0; i < roles.length; i++) {
            roles_html += `<div>${roles[i]}</div>`;
        }

        // вставка html со списком ролей в таблицу Юзер
        $("#oneUserRolesNames").empty().append(roles_html);
    });
}
