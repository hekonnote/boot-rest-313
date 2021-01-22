package tsoy.sergey.boot311.dto;

public class UserDto {

    private Long id;
    private String name;
    private int age;
    private String password;
    private String[] rolesNames;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String[] getRolesNames() {
        return rolesNames;
    }

    public void setRolesNames(String[] rolesNames) {
        this.rolesNames = rolesNames;
    }
}
