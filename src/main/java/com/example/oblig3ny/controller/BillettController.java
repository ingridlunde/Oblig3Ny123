package com.example.oblig3ny.controller;


import com.example.oblig3ny.model.BillettRegister;
import com.example.oblig3ny.repository.BillettRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BillettController {

//Legge til repo hvis jeg får tid/får det til.

    @Autowired
    BillettRepository repo;

    //private final ArrayList<BillettRegister> billettregister = new ArrayList<>();


    //Legger til film


    // For å legge til filmene før ting registreres
    /*@GetMapping("/hentFilmer")
 public List<Film> leggTilFilm() {
        List <Film> film = new ArrayList<>();
        film.add(new Film("Spider-man No Way Home"));
        film.add(new Film("The King's man"));
        film.add(new Film("Verdens Verste Menneske"));
        return film;

    }*/

    //For å hente info fra skjema
    @GetMapping ("/hentAlle")
    public List <BillettRegister> sjekkBestilling() {
        return repo.visBillettRegister();
    }

    @PostMapping("/lagre")
    public void registrerBestilling(BillettRegister innBestilling) {
        repo.registrerBestilling(innBestilling);
    }

    @GetMapping("/slettAlt")
    public void slettAlt() {
        repo.slettBilletter();
    }
}
