package com.example.oblig3ny.repository;



import com.example.oblig3ny.model.BillettRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    public void registrerBestilling(BillettRegister innBestilling) {
        String sql = "INSERT INTO BillettRegister(film, antall, fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        db.update (sql, innBestilling.getFilm(), innBestilling.getAntall(), innBestilling.getFornavn(), innBestilling.getEtternavn(), innBestilling.getTelefonnr(),
                innBestilling.getEpost());
    }

    public List <BillettRegister> visBillettRegister() {
        String sql = "SELECT * FROM BillettRegister";
        List <BillettRegister> alleBilletter = db.query(sql, new BeanPropertyRowMapper<>(BillettRegister.class));
        return alleBilletter;

    }

    public void slettBilletter() {
        String sql = "DELETE FROM BillettRegister";
        db.update(sql);
    }
}
