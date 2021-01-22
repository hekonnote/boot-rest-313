package tsoy.sergey.boot311.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tsoy.sergey.boot311.dao.RoleDao;
import tsoy.sergey.boot311.models.Role;

import java.util.List;

@Service
public class RoleServiceImp implements RoleService {
    private final RoleDao roleDao;

    @Autowired
    public RoleServiceImp(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Transactional(readOnly = true)
    @Override
    public List<Role> getAll() {
        return roleDao.getAll();
    }

    @Transactional
    @Override
    public void add(Role role) {
        roleDao.add(role);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        roleDao.delete(id);
    }

    @Transactional
    @Override
    public Role getById(Long id) {
        return roleDao.getById(id);
    }

    @Transactional
    @Override
    public Role getByName(String name) {
        return (Role) roleDao.getByName(name);
    }

    @Transactional
    @Override
    public void update(Long id, Role updatedRole) {
        roleDao.update(id, updatedRole);
    }
}
