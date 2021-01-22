package tsoy.sergey.boot311.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import tsoy.sergey.boot311.models.Role;
import tsoy.sergey.boot311.models.User;
import tsoy.sergey.boot311.services.RoleService;
import tsoy.sergey.boot311.services.UserService;

import java.util.HashSet;
import java.util.Set;

@Controller
@RequestMapping("/admin")
public class AdminControllerNew {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminControllerNew(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    // getAllUsers version 1 (Этот метод работает корректно)
    @GetMapping()
    public String getAllUsers(Model model, @AuthenticationPrincipal User user) {
        model.addAttribute("roles", roleService.getAll());
        model.addAttribute("users", userService.getAll());
        model.addAttribute("user", user);
        model.addAttribute("userRoles", user.getRoles());
        return "app";

    }

    // getAllUsers version 2 (Этот метод работает корректно)
//    @GetMapping()
//    public String getAllUsers(Model model){
//        model.addAttribute("roles", roleService.getAll());
//        model.addAttribute("users", userService.getAll());
//        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        model.addAttribute("user", user);
//        model.addAttribute("userRoles", user.getRoles());
//        return "users";
//    }

    // Этот метод здесь не востребован и его в принципе можно закомментить
    // По крайней мере, я так думаю на данный момент)))))
    @GetMapping("/users/{id}")
    public String getUserById(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.getById(id));
        model.addAttribute("roles", userService.getById(id).getRoles());
        return "userById";
    }

//    @GetMapping("/users/new") // получаем форму для создания нового юзера
//    public String newUser(Model model) { // через пустого new User()
//        model.addAttribute("user", new User());
//        return "/new";
//    }

//    @GetMapping("/users/new") // получаем форму для создания нового юзера
//    public String newUser(@ModelAttribute("user") User user) {// то же самое через @ModelAttribute
//        return "new";
//    }

    // Этот метод здесь не востребован и его в принципе можно закомментить
    // По крайней мере, я так думаю на данный момент)))))
    @GetMapping("/users/new")
    public String newUser(Model model) {
//        User user = new User();
//        user.setRoles(new HashSet<>(roleService.getAll()));
        model.addAttribute("user", new User());
        model.addAttribute("rolesNames", roleService.getAll());
        return "new";
    }

    // Этот метод работает корректно
    @PostMapping("/users")
    public String create(@ModelAttribute("user") User user, @RequestParam(value = "rolesNames") String[] roles) {
        Set<Role> rolesSet = new HashSet<>();
        for (String roleName : roles) {
            rolesSet.add(roleService.getByName(roleName));
        }
        user.setRoles(rolesSet);
        userService.add(user);
        return "redirect:/admin";
    }

    // Этот метод здесь не востребован и его в принципе можно закомментить (все уже совмещено в getAllUsers())
    // По крайней мере, я так думаю на данный момент)))))
    @GetMapping("/users/{id}/edit")
    public String edit(Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.getById(id));
        model.addAttribute("rolesNames", roleService.getAll());
        return "edit";
    }

    // Этот метод работает корректно
    @PostMapping("/users/{userId}")
    public String update(@PathVariable("userId") Long id,
                         @ModelAttribute("user") User user,
                         @RequestParam(value = "userRoles") String[] roles) {
        Set<Role> rolesSet = new HashSet<>();
        for (String roleName : roles) {
            rolesSet.add(roleService.getByName(roleName));
        }
        user.setRoles(rolesSet);
        userService.update(id, user);
        return "redirect:/admin";
    }

    // Этот метод работает корректно
    @PostMapping("/users/{id}/delete")
    public String delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }

    // Этот метод декоративный. Он не влияет ни на что.
    @ModelAttribute("headerMessage") // @ModelAttribute на методе делает доступной в каждой модели класса пару:
    public String header() {         // key("headerMessage") <--> value("Task BootStrap-312")
        return "Task BootStrap-312"; // при необходимости можно вывести ее на странице в браузере
    }
}





