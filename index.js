let tableau = [
    {
        id:1,
        image_produit:"https://back.femininbio.com/attachments/2020/11/20/landscape/w800/11065-banane.jpg",
        quantite:2,
        prix:10000,
        nom_produit:"banane",
        stock:200
    },
    {
        id:2,
        image_produit:"https://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY=",
        quantite:2,
        prix:10000,
        nom_produit:"orange",
        stock:120
    },
    {
        id:3,
        image_produit:"https://vergerpelanne.com/wp-content/uploads/2017/06/pomme-anaglo.jpg",
        quantite:2,
        prix:10000,
        nom_produit:"pomme",
        stock:100
    }
]

let DIV_differents_products = document.querySelector(".differents_products");
let DIV_one_product = document.querySelectorAll(".one_product");
let TBODY_all_products_request = document.querySelector("#all_products_request");
let FORM_submit_form = document.querySelector("#submit_form");
let BUTTON_valider_commande = document.querySelector("#valider_commande");

class Produit{
    constructor(id,quantite,prix,nom_produit,stock,image_produit){
        this.id = id;
        this.quantite = quantite;
        this.prix = prix;
        this.stock = stock;
        this.nom_produit = nom_produit;
        this.image_produit=image_produit;
    }

    static fromDataToProduit(item){
        return new Produit(
            item.id,item.quantite,
            item.prix,item.nom_produit,item.stock,
            item.image_produit
            );
    }
}


class User {
    constructor(nom,prenom,adresse,telephone){
        this.nom = nom;
        this.prenom = prenom ;
        this.adresse = adresse ;
        this.telephone = telephone;
    }

    static fromDataToProduit(item){
        return new User(
            item.nom,
            item.prenom,item.adresse,item.telephone
            );
    }
}

class Helper {
    static findProduitById(id){
        let POSITION = 0;
        let data = tableau.filter((item) => item.id ==id);
        return data[POSITION];
    }
}


class UI {
    static createOneDivOneProduct(Produit){
        let div = document.createElement("div");
        div.innerHTML =`
        <div class="image">
            <img src="${Produit.image_produit}" alt="" />
        </div>
        <div class="informations">
            <h5>Article : ${Produit.nom_produit}</h5>
            <h5>Prix : ${Produit.prix} FCFA</h5>
            <h5>Stock : ${Produit.stock}</h5>
        </div>
        <button id="${Produit.id}" class="product_details ${Produit.id}">Ajouter</button>
        `;
        div.className = "one_product";

        return div;
    }

    static createOneTrRowInTheTable(Produit){
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${Produit.nom_produit}</td>
            <td>${Produit.prix}</td>
            <td>${Produit.quantite}</td>
            <td>
                <button id="add" class="add ${Produit.id}">AJOUTER <i class="fa fa-plus" aria-hidden="true"></i></button>
                <button id="del" class="del ${Produit.id}">ENLEVER <i class="fa fa-trash" aria-hidden="true"></i></button>
            </td>
        `
        return tr;
    }

    static printProduct(){
        tableau.forEach((element)=>{
            // transformer un element en classe Produit
            let produit = Produit.fromDataToProduit(element);
            
            // creer une div avec ce produit cree
            let div = UI.createOneDivOneProduct(produit);

            // ajouter a la div mere , l'element cree
            DIV_differents_products.appendChild(div);
        })
    }

    static addCommandInStorage(element=null){
        let items =  []
        if(localStorage.getItem("panier")!==null){
            let elements = JSON.parse(localStorage.getItem("panier"));
            elements.push(element);
            localStorage.setItem("panier",JSON.stringify(elements));
        }else {
            items.push(element)
            //console.log(items);
            localStorage.setItem("panier",JSON.stringify(items));
        }
    }

    static getElementFromStorage(){
        if(localStorage.getItem("panier")!==null){
            return JSON.parse(localStorage.getItem("panier"));
        }else {
            return [];
        }
    }


    static renderInTheTable(){
        let allProducts = UI.getElementFromStorage();

            for(let element=0;element<allProducts.length;element++){

                // creer une ligne **tr** HTML
            let one_row = UI.createOneTrRowInTheTable(allProducts[element]);

            // ajouter la ligne dans le tableau
            TBODY_all_products_request.appendChild(one_row);

            }
    }

    static addProductInTheBasket(e){
        e.preventDefault();
        let POSITION_OF_ID = 1;

        // recuperer le parent de l'element clique
        let idOfClickedElement = e.target.classList[POSITION_OF_ID];

        // recuperer l'element trouve
        let data = Helper.findProduitById(idOfClickedElement);
        
        // verification si le resultat est different de NULL
        if(data !== null){
            let produit = Produit.fromDataToProduit(data);

            // ajouter les elements dynamiquement
            UI.addCommandInStorage(produit);

            // recuperer tous les elements du store;

            UI.renderInTheTable();

            
        }else{
            alert("ID INTROUVABLE");
        }
    }

    static addUserInStorage(user){
        let users = [];
        if(localStorage.getItem("users")!==null){
            let elements = JSON.parse(localStorage.getItem("users"));
            elements.push(user);
            localStorage.setItem("users",JSON.stringify(users))
        }else{
            users.push(user);
            localStorage.setItem("users",JSON.stringify(users));
        }
    }


    static clearTheForm(){
        document.querySelector("#nom").value = "";
        document.querySelector("#prenom").value="";
        document.querySelector("#adresse").value="";
        document.querySelector("#telephone").value="";
    }


    static handleFormClient(){
        FORM_submit_form.addEventListener("click",(e)=>{
            e.preventDefault();
            // recuperation de tous les champs 
            // de type **TEXT** 
            // du formulaire 
            let champsText = document
                .querySelectorAll(".information_client .form form input[type='text']");

                // recuperaytion de tous les champs 
                // de type **NUMBER** 
                // du formulaire 
            let champsNumber = document
                .querySelectorAll(".information_client .form form input[type='number']");

            // le nombre de champs remplis dans le formulaire    
            let NombreDeChampsTextRemplis = 0;    
            for(let number=0;number<champsText.length;number++){
                // si le champ est rempli 
                // on incremente la variable
                if(champsText[number].value.trim() !== ""){
                    NombreDeChampsTextRemplis++;
                }
            }

            let NombreDeChampNumberRemplis = 0;
            for(let number=0;number<champsNumber.length;number++){
                if(champsNumber[number].value){
                    NombreDeChampNumberRemplis++;
                }
            }

            // condition 
            // verification si nombre de champ type[number] rempli 
            // egal le nombre total de champ
            // et 
            // condition 
            // verification si nombre de champ type[texte] rempli 
            // egal le nombre total de champ
            if(NombreDeChampNumberRemplis == champsNumber.length
                &&
                NombreDeChampsTextRemplis == champsText.length){

                    let nom = document.querySelector("#nom").value
                    let prenom = document.querySelector("#prenom").value;
                    let adresse = document.querySelector("#adresse").value;
                    let telephone = document.querySelector("#telephone").value;

                    let user = new User(nom,prenom,adresse,telephone);

                    // add user in storage
                    UI.addUserInStorage(user)

                    // vider les champs du formulaire
                    UI.clearTheForm();
               
            }else{
                alert("VEUILLEZ REMPLIR TOUS LES CHAMPS DU FORMULAIRE")
            }

        })
    }

    static handleClickOneOnOneProductClass(){
        // recuperer tous les enfants de la div
       let children = document.querySelectorAll(".differents_products .product_details");
        
       // avoir le nombre d'enfants dans la div
       let longueurDesEnfants = children.length;

      for(let i=0;i<longueurDesEnfants;i++){
          children[i].addEventListener("click",UI.addProductInTheBasket);
      }
    }

    static validateUserCommand(){
        BUTTON_valider_commande.addEventListener("click",(e)=>{
            e.preventDefault();

            // recuperer les elements dans le storage 
            var theUser = JSON.parse(localStorage.getItem("users"));
            var userProducts = JSON.parse(localStorage.getItem("panier"));

            // associer l'utilisateur et ses 
            // commandes 
            let userCommand = {
                "user" : theUser[0],
                "produits" : userProducts
            }

            // creer un storage dynamique 
            let command = [];
            if(localStorage.getItem("commands")!==null){
                let elements = JSON.parse(localStorage.getItem("commands"));
                elements.push(userCommand);
                localStorage.setItem("commands",JSON.stringify(elements));
            }else{
                command.push(userCommand);
                localStorage.setItem("commands",JSON.stringify(command));
            }

            //empty the others storage 
            localStorage.setItem("users",null);
            localStorage.removeItem("users");
            localStorage.setItem("panier",null);
            localStorage.removeItem("panier");
        })
    }

    static fillTheFinalForm(){
        let fieldAdresse = document.querySelector("#final_adresse");
        let fieldNomComplet = document.querySelector("#final_nomComplet");
        let fieldTelephone = document.querySelector("#final_telephone");
        let UL_all_clients_final_products = document.querySelector("#all_clients_final_products");
        let FIELD_montant_final = document.querySelector("#montant_final");
        if(localStorage.getItem("commands")!==null && 
        localStorage.getItem("commands") !== undefined){
            let data = JSON.parse(localStorage.getItem("commands"));

            // recuperer les informations du client
            let user = data[0].user;
            fieldAdresse.value = user.adresse;
            fieldNomComplet.value = user.nom + " " + user.prenom;
            fieldTelephone.value = user.telephone;

            // recuperer ses produits
            let products = data[0].produits;
            let montantTotal = 0
            products.forEach((product)=>{
                // creer un element HTML li 
                let li = document.createElement("li");

                // mettre du contenu html dans notre balise li 
                li.innerHTML= `
                    <p>Nom : ${product.nom_produit}</p>
                    <p>Prix U. : ${product.prix}</p>
                    <p>Quantite : ${product.quantite}</p>
                    <hr/>
                `

                // ajouter l'element a la mere UL 
                UL_all_clients_final_products.appendChild(li);

                // calculer le montant total 
                montantTotal+= (product.prix * product.quantite);
            });

            // calculer le montant de la commande 
            FIELD_montant_final.value =`TOTAL : ${montantTotal} FCFA`;
            
        }
        
    }
}

UI.printProduct();

UI.handleClickOneOnOneProductClass();

UI.handleFormClient();

UI.renderInTheTable();

UI.validateUserCommand();

UI.fillTheFinalForm();