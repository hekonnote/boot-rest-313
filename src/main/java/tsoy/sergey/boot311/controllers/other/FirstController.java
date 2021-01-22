package tsoy.sergey.boot311.controllers.other;//package tsoy.sergey.springCrudSecurity.controllers;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//@Controller
//@RequestMapping("/first")
//public class FirstController {
//
////    @GetMapping("/hello") //через HttpServletRequest request
////    public String helloPage(HttpServletRequest request) {
////        String name = request.getParameter("name");
////        String surname = request.getParameter("surname");
////        System.out.println("Hello, " + name + " " + surname);
////        return "first/hello";
////    }
//
//    @GetMapping("/hello") //через @RequestParam
//    public String helloPage(@RequestParam(value = "name", required = false) String name,
//                            @RequestParam(value = "surname", required = false) String surname,
//                            Model model) {
////        System.out.println("Hello, " + name + " " + surname);
//        model.addAttribute("message", "Hello, " + name + " " + surname);
//
//        return "first/hello";
//    }
//
//    @GetMapping("/goodbye")
//    public String goodByePage() {
//        return "first/goodbye";
//    }
//
//    @GetMapping("/calculator")
//    public String calculator(@RequestParam("a") int a, @RequestParam("b") int b,
//                             @RequestParam("action") String action, Model model) {
//
//        double result;
//
//        switch (action) {
//            case "mult":
//                result = a * b;
//                break;
//            case "div":
//                result = (double) a / b;
//                break;
//            case "sum":
//                result = a + b;
//                break;
//            case "sub":
//                result = a - b;
//                break;
//            default:
//                result = 0;
//                break;
//        }
//
//        model.addAttribute("result", result);
//
//        return "first/calculator";
//    }
//}
