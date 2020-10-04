export default { 
     name : "order",
     data () {
        return {
          e1: 1,
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
          ],
          email:'',
          OTP:'',
          orderedProduct:[],
          token:null,
        }
      },
      created() { 
          this.getData();
      },
      methods: { 
          getData() { 
              this.token = this.$cookies.get("jwt");
              if(this.token === undefined) return;

              this.orderedProduct = this.sortCookie();
          },
          sortCookie() {
            //If user is not logged in
            let existing_cookies = this.$cookies.get("ordered-products");
      
            if (existing_cookies === undefined) return;
            else {
              let splitCookie = existing_cookies.split(";");
      
              splitCookie.forEach((item) => {
                if (item === "") {
                  splitCookie.pop();
                }
              });
      
              let finalCookie = [];
      
              splitCookie.forEach((item) => {
                let parsed = JSON.parse(item);
                finalCookie.push(parsed);
              });
      
              return finalCookie;
            }
          },
          fetchCartProductImages(product) {
            return (
              process.env.VUE_APP_HOST_URL +
              "/" +
              product.name +
              "/" +
              product.file_name
            );
          },
         
      },
      watch: {
        orderedProduct() {
          if (this.orderedProduct.length > 0) {
            this.cartTotal = this.orderedProduct
              .map((item) => item.final_price)
              .reduce((prev, next) => prev + next);
          }
        },
      },
 }