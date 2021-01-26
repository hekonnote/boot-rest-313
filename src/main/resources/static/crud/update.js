// $(document).ready(function () {
//
//     let update_html = `
//                 <!-- Edit modal start-->
// <div class="modal fade" th:id="${'Edit'+ val.id}" tabindex="-1" role="dialog"
//      th:aria-labelledby="${'Edit'+ val.id + 'Label'}" aria-hidden="true">
//     <div class="modal-dialog">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <h5 class="modal-title" th:id="${'Edit'+ val.id + 'Label'}" th:text="${'Edit '+ val.name}">Edit user</h5>
//                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">&times;</span>
//                 </button>
//             </div>
//             <!--Body (edit) start-->
//             <div class="modal-body text-center">
//
//                 <div class="row">
//                     <div class="col-sm-3"></div>
//                     <div class="col-sm-6">
//
//                         <form id="edit-user-form" th:action="@{/admin/users/{userId}(userId=${user.id})}"
//                               th:method="post" th:object="${val}"
//                               th:id="${'EditForm' + val.id}">
//
//                             <div class="form-group">
//                                 <label class="font-weight-bold"
//                                        for="showId">ID</label>
//                                 <input type="text"
//                                        name="id"
//                                        id="showId"
//                                        class="form-control"
//                                        th:value="${val.id}"
//                                        readonly>
//                             </div>
//                             <div class="form-group">
//                                 <label class="font-weight-bold"
//                                        for="editName">Name</label>
//                                 <input type="text"
//                                        name="name"
//                                        id="editName"
//                                        class="form-control"
//                                        th:value="${val.name}"
//                                        required>
//                             </div>
//                             <div class="form-group">
//                                 <label class="font-weight-bold"
//                                        for="editAge">Age</label>
//                                 <input type="text"
//                                        name="age"
//                                        id="editAge"
//                                        class="form-control"
//                                        th:value="${val.age}">
//                             </div>
//                             <div class="form-group">
//                                 <label class="font-weight-bold"
//                                        for="editPassword">Password</label>
//                                 <input type="password"
//                                        class="form-control"
//                                        name="password"
//                                        id="editPassword"
//                                        value=""
//                                 placeholder="New password" required>
//                             </div>
//                             <div class="form-group">
//                                 <label class="font-weight-bold"
//                                        for="editRoles">Roles</label>
//                                 <select multiple size="2" class="form-control"  id="editRoles"
//                                         name="userRoles" required>
//                                     <option
//                                             th:each="role : ${roles}"
//                                             th:value="${role.role}"
//                                             th:text="${role.role}">
//                                     </option>
//                                 </select>
//                             </div>
//                         </form>
//                     </div>
//                     <div class="col-sm-3"></div>
//                 </div>
//             </div>
//             <!--Body (edit) end-->
//
//             <div class="modal-footer">
//                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//                 <button type="submit" th:form="${'EditForm' + val.id}"
//                         class="btn btn-primary">Edit
//                 </button>
//             </div>
//         </div>
//     </div>
// </div>
// <!-- Edit modal end-->
// `;
//     $("#myTabContent").append(newUserTab_html);
//
//     //переменная для хранения ролей
//     let options_html = null;
//
//     //создаем возможность выбора ролей в цикле: <option>ROLE_USER</option> через js-код
//     //                                          <option>ROLE_ADMIN</option> через js-код
//     $.getJSON("/api/users/new", function (blankUser) {
//         for (let i = 0; i < blankUser.roles.length; i++) {
//             options_html += `
//             <option>${blankUser.roles[i].role}</option>
//             `;
//         }
//         $("#roles").append(options_html);
//
//     });
//
//     // будет работать, если создана форма товара
//     $(document).on('submit', '#edit-user-form', function(){
//         // получение данных формы
//         var form_data=JSON.stringify($(this).serializeObject());
//
//         // отправка данных формы в API
//         $.ajax({
//             url: "/api/admin/users",
//             type : "POST",
//             contentType : 'application/json',
//             data : form_data,
//             success : function(result) {
//                 // продукт был создан, вернуться к списку продуктов
//                 showAdminPanel();
//                 readUsers()
//                 $("#myTabContent").append(newUserTab_html);
//                 $("#roles").append(options_html);
//             },
//             error: function(xhr, resp, text) {
//                 // вывести ошибку в консоль
//                 console.log(xhr, resp, text);
//             }
//         });
//
//         return false;
//     });
//
// });
//
