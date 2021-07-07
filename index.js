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

            // creer une ligne **tr** HTML
            let one_row = UI.createOneTrRowInTheTable(produit);

            // ajouter la ligne dans le tableau
            TBODY_all_products_request.appendChild(one_row);
        }else{
            alert("ID INTROUVABLE");
        }
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
}

UI.printProduct();

UI.handleClickOneOnOneProductClass();