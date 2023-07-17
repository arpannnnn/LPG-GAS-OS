import axios from "axios";
import Noty from "noty";
import { loadStripe } from "@stripe/stripe-js";
export async function initStripe() {
    const stripe = await loadStripe
    ('pk_test_51NTJ95BeehU2T2NQ6DHkPuu16SdHsqp4D2SktDBPxZzntArTf5olQfkPIIa5knfwZ3tWIlTTpLJsOVlxBUy65gaQ00p6Qd99nE');
           
    
   let card =null;
function mountWidget () {
                const elements =   stripe.elements()


        let style={
         base:{
            color:'#32325d',
            fontFamily: '"Helvetica Neue",Helvetica, sans-serif',
            fontSmoothing:'antiliased',
            fontSize:'16px',
            '::placeholder':{
            color:'#aab7c4'
        }

    },
    invalid: {
        color:'#fa755a',
        iconColor: 'fa755a'
    }
    }





      card=elements.create('card',{ style,hidePostalCode:true })
     card.mount('#card-element')

   }
     
    
        const paymentType = document.querySelector("#paymentType");

        if(!paymentType){
            return;
        }
             paymentType.addEventListener('change',(e)=>{
             
            
                if(e.target.value==='card'){
                    //display widget
                    mountWidget();
                    
                } else {
                    card.destroy()
                    //
                }


             })
    



  //Ajax call
  const paymentForm = document.querySelector("#payment-form");

  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let formData = new FormData(paymentForm);
      let formObject = {};

      for (let [key, value] of formData.entries()) {
        formObject[key] = value;
      }

      axios
        .post("/orders", formObject)
        .then((res) => {
          new Noty({
            type: "success",
            timeout: 1000,
            progressBar: false,
            text: res.data.message,
          }).show();

          setTimeout(() => {
            window.location.href = "/customer/orders";
          }, 1000);
        })
        .catch((err) => {
          new Noty({
            type: "error",
            timeout: 1000,
            progressBar: false,
            text: err.data.message,
          }).show();
        });
      console.log(formObject);
    });
  }
}


