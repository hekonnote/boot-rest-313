package tsoy.sergey.boot311.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import tsoy.sergey.boot311.models.User;
import tsoy.sergey.boot311.services.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService1) {
        this.userService = userService1;
    }

    // Метод работает, но есть сомнения, что корректно сработает если в базе будут юзеры с одинаковыми именами
//    @GetMapping
//    public String user(Principal principal, Model model) {
//        String name = principal.getName();
//        User user = userService.getByName(name);
//        model.addAttribute("user", user);
//        return "user";
//    }

    @GetMapping()
    public String user(@AuthenticationPrincipal User user, Model model) {
        model.addAttribute("user", user);
        model.addAttribute("roles", user.getRoles());
        return "user";
    }


    // Этот метод декоративный. Он не влияет ни на что.
    @ModelAttribute("headerMessage") // @ModelAttribute на методе делает доступной в каждой модели класса пару:
    public String header() {         // key("headerMessage") <--> value("Task BootStrap-312")
        return "Task BootStrap-312"; // при необходимости можно вывести ее на странице в браузере
    }
}
