
$(function() {
    leggTilFilm();
})

function leggTilFilm() {
    $.get("/hentFilmer", function (filmer) {
        console.log(filmer);
        formaterFilm(filmer);
    })
}

function formaterFilm(filmer) {
    let ut = "<select id='velgFilm'>" + "<option value='default value' selected>Velg film</option>"
    for (const film of filmer) {
        ut += "<option value='"+film.film+"'>"+film.film+"</option>";
    }
    ut +="</select>";
    $("#velgFilmDropdown").html(ut);
}

function registrerBestilling () {

    //Kopler attributtene til id i HTML.
    const film = $("#velgFilm");
    const antall = $("#antall");
    const fornavn = $("#fornavn");
    const etternavn = $("#etternavn");
    const telefonnr = $("#telefonnr");
    const epost = $("#epost");

    //Samler alle inputene i const bestilling, fra id i HTML gjort over.
    const bestilling = {
        film: film.val(),
        antall: antall.val(),
        fornavn: fornavn.val(),
        etternavn: etternavn.val(),
        telefonnr: telefonnr.val(),
        epost: epost.val()
    };

    //Sjekke bestilling før lagring
    if (!sjekkBestilling(bestilling)) {
        return
    }

    //Lagrer inputene
    $.post("/lagre", bestilling, function() {

    });

    //Nullstill inputboksene med beskjed hvis det blir registrert. Nullstiller feilmeldinger
    $("#resultatFilm").html("");
    $("#resultatAntall").html("");
    $("#resultatFornavn").html("");
    $("#resultatEtternavn").html("");
    $("#resultatTelefonnr").html("");
    $("#resultatEpost").html("");

    //Blir dette dobbelt opp? Har prøvd å sjekke,
    // men får ikke vekk inputene nå det er feil og ferdigregistrert,
    // Når disse er der funker det.
    film.val("default value"),
        antall.val(""),
        fornavn.val(""),
        etternavn.val(""),
        telefonnr.val(""),
        epost.val("")

    // Viser billettregisteret som tar getkal frå server og henter bestillingen
    visBillettRegister()

}

//Kjører iftest over visBilettRegistrer for å inputvalidere.
function sjekkBestilling(bestilling) {

    let antallStreng = bestilling.antall;
    let antall = Number(antallStreng);
    let altOk = true;

    //registrer film
    (bestilling.film === "")
    if (bestilling.film == "default value") {
        $("#resultatFilm").html("Du må velge film");
        altOk = false
    }

    //registrer antall
    $("#resultatAntall").html("")
    if (isNaN(antall) || antall <=0) {
        $("#resultatAntall").html("Må skrive tall i feltet");
        altOk = false;
    }

    //Sjekke fornavn
    $("#resultatFornavn").html("")
    if (bestilling.fornavn =='') {
        $("#resultatFornavn").html("Må skrive noe i feltet");
        altOk = false;
    }

    //Sjekk etternavn
    $("#resultatEtternavn").html("")
    if (bestilling.etternavn =='') {
        $("#resultatEtternavn").html("Må skrive noe i feltet");
        altOk = false;
    }

    //Sjekke telefonnr
    $("#resultatTelefonnr").html("");
    if (bestilling.telefonnr=='') {
        $("#resultatTelefonnr").html("Må skrive noe i feltet");
        altOk = false;
    }

    //Sjekke email
    $("#resultatEpost").html("");
    if (bestilling.epost == '') {
        $("#resultatEpost").html("Må skrive noe i feltet");
        altOk = false;
    }

    return altOk;

}

//Fjerner alt fra arrayet
function slettAlt () {
    //Fjerne alt fra Array
    $.get("/slettAlt", function () {
        //Viser et tomt array
        visBillettRegister()
    })
}

function visBillettRegister() {

    $.get("/hentAlle", function (billett) {
        //Skriv ut
        let ut = "<table class='table table-striped'><tr>" +
            "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
            "</tr>";

        for (let b of billett) {
            ut += "<tr>";
            ut += "<td>" + b.film + "</td><td>" + b.antall + "</td><td>" + b.fornavn + "</td><td>" + b.etternavn + "</td><td>" + b.telefonnr + "</td><td>" + b.epost + "</td>";
            ut += "</tr>";

        }
        ut += "</table>"
        $("#billettregister").html(ut);
    });
}





