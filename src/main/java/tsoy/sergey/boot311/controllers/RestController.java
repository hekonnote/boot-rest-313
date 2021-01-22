package tsoy.sergey.boot311.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import tsoy.sergey.boot311.dto.UserDto;
import tsoy.sergey.boot311.models.Role;
import tsoy.sergey.boot311.models.User;
import tsoy.sergey.boot311.services.RoleService;
import tsoy.sergey.boot311.services.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

    private RoleService roleService;
    private UserService userService;

    @Autowired
    public RestController(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @GetMapping("/admin/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAll();
        return users != null && !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/admin/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User user = userService.getById(id);
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user")
    public User getUser(@AuthenticationPrincipal User user) {
        return user;
    }

    @GetMapping("/users/new")
    public User newUser() {
        User blankUser = new User();
        blankUser.setRoles(new HashSet<>(roleService.getAll()));
        return blankUser;
    }

//    @PostMapping("/admin/users")
//    public ResponseEntity<User> createUser(@RequestBody User user, @RequestParam(value = "rolesNames") String[] roles) {
//        userService.add(user);
//        return new ResponseEntity<>(userService.getByName(user.getName()), HttpStatus.CREATED);
//    }

//    @PostMapping("/admin/users")
//    public ResponseEntity<User> createUser(@RequestBody User user) {
//        userService.add(user);
//        return new ResponseEntity<>(userService.getByName(user.getName()), HttpStatus.CREATED);
//    }

//    @PostMapping("/admin/users")
//    public ResponseEntity<User> createUser(@RequestBody User user, @RequestParam(value = "rolesNames") String[] roles) {
//        Set<Role> rolesSet = new HashSet<>();
//        for (String roleName : roles) {
//            rolesSet.add(roleService.getByName(roleName));
//        }
//        user.setRoles(rolesSet);
//        userService.add(user);
//        return new ResponseEntity<>(userService.getByName(user.getName()), HttpStatus.CREATED);
//    }

    @PostMapping("/admin/users")
    public ResponseEntity<User> createUser(@RequestBody UserDto userDto) {
        Set<Role> rolesSet = new HashSet<>();
        for (String roleName : userDto.getRolesNames()) {
            rolesSet.add(roleService.getByName(roleName));
        }
        User user = new User(userDto);
        user.setRoles(rolesSet);
        userService.add(user);
        return new ResponseEntity<>(userService.getByName(user.getName()), HttpStatus.CREATED);
    }

    @PutMapping("/admin/users/{userId}")
    public ResponseEntity<User> update(@PathVariable("userId") Long id,
                                       @RequestBody User user) {
        Set<Role> rolesSet = new HashSet<>();
        for (Role roleName : user.getRoles()) {
            rolesSet.add(roleService.getByName(roleName.getRole()));
        }//@RequestParam(value = "userRoles") String[] roles
        user.setRoles(rolesSet);

        userService.update(id, user);
        User updatedUser = userService.getById(id);

        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/admin/users/{userId}")
    public ResponseEntity<List<User>> delete(@PathVariable Long userId) {
        userService.delete(userId);
        List<User> users = userService.getAll();
        return new ResponseEntity<>(users, HttpStatus.OK);

//        List<User> users = userService.getAll();
//        return users != null && !users.isEmpty()
//                ? new ResponseEntity<>(users, HttpStatus.OK)
//                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
