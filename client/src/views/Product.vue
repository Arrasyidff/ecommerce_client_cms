<template>
    <div class="product-section">
        <md-dialog
          :md-active.sync="active"
        >
          <div class="dialog-form">
            <h1>{{titleDialog}}</h1>
            <form @submit.prevent="postNewData">
              <md-field>
                <label>Name</label>
                <md-input type="text" v-model="name"></md-input>
              </md-field>
              <md-field>
                <label>Image url</label>
                <md-input type="text" v-model="image_url"></md-input>
              </md-field>
              <md-field>
                <label>Price</label>
                <md-input type="number" v-model="price"></md-input>
              </md-field>
              <md-field>
                <label>Stock</label>
                <md-input type="number" v-model="stock"></md-input>
              </md-field>
              <div class="error-display">
                <div v-if="error !== ''" class="alert alert-danger" role="alert">
                  {{error}}
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </md-dialog>

        <md-dialog
          :md-active.sync="activeDelete"
        >
          <p class="delete-title-dialog">Delete</p>
        <div class="delete-dialog">
          <div class="delete-content-dialog">
            <p>Are you sure you want to delete this item ?</p>
          </div>
          <div class="delete-actions">
            <button @click="closeDeleteDialog" class="btn btn-primary">NO</button>
            <button @click="deleteProduct" class="btn btn-danger">YES</button>
          </div>
        </div>
        </md-dialog>

        <div class="header-product">
          <p>List product</p>
          <p class="btn-addForm" @click="openCreateDialog">Create new product</p>
        </div>
        <div class="product-table">
          <table class="table table-responsive table-striped table-bordered">
            <thead class="table-primary">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Stock</th>
                <th scope="col">Price</th>
                <th scope="col">Product</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in fetchData" :key="index">
              <tr>
                <th>{{index + 1}}</th>
                <td>{{item.name}}</td>
                <td>{{item.stock}}</td>
                <td>{{item.price}}</td>
                <td class="image-row">
                  <div class="image-product">
                    <img :src="item.image_url" alt="">
                  </div>
                </td>
                <td class="btn-row">
                  <div class="action-table">
                    <button class="btn btn-primary" @click="openUpdateDialog(item)">update</button>
                    <button class="btn btn-danger" @click="openDeleteDialog(item.id)">delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
</template>

<script>
import Axios from '../config/axiosIntance'

export default {
  name: 'Product',
  data: () => ({
    active: false,
    activeDelete: false,
    idUpdate: '',
    idDelete: '',
    name: '',
    image_url: '',
    price: '',
    stock: '',
    error: '',
    methodFor: '',
    titleDialog: ''
  }),
  computed: {
    fetchData () {
      return this.$store.state.products
    },
    errorMessage () {
      return this.$store.state.error
    }
  },
  methods: {
    resetData () {
      this.idDelete = ''
      this.idUpdate = ''
      this.name = ''
      this.image_url = ''
      this.price = ''
      this.stock = ''
    },
    openCreateDialog () {
      this.resetData()
      this.active = true
      this.methodFor = 'post'
      this.titleDialog = 'Create new product'
    },
    postNewData () {
      if (this.methodFor === 'post') {
        Axios({
          url: 'product',
          method: 'POST',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            name: this.name,
            image_url: this.image_url,
            price: this.price,
            stock: this.stock
          }
        })
          .then(response => {
            console.log(response.data)
            this.fetchAllData()
            this.resetData()
            this.active = false
          })
          .catch(err => {
            console.log(err.response.data.msg)
            this.error = err.response.data.msg
            setTimeout(() => {
              this.error = ''
            }, 3000)
          })
      } else if (this.methodFor === 'put') {
        Axios({
          url: 'product/' + this.idUpdate,
          method: 'PUT',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            name: this.name,
            image_url: this.image_url,
            price: this.price,
            stock: this.stock
          }
        })
          .then(response => {
            console.log(response.data)
            this.fetchAllData()
            this.resetData()
            this.active = false
          })
          .catch(err => {
            console.log(err.response.data.msg)
            this.error = err.response.data.msg
            setTimeout(() => {
              this.error = ''
            }, 3000)
          })
      }
    },
    openUpdateDialog (item) {
      this.methodFor = 'put'
      this.titleDialog = 'Update product'
      this.idUpdate = item.id
      this.name = item.name
      this.image_url = item.image_url
      this.price = item.price
      this.stock = item.stock
      this.active = true
    },
    fetchAllData () {
      this.$store.dispatch('fetchData')
    },
    openDeleteDialog (id) {
      this.idDelete = id
      this.activeDelete = true
    },
    closeDeleteDialog () {
      this.activeDelete = false
      this.resetData()
    },
    deleteProduct () {
      this.$store.dispatch('deleteProduct', this.idDelete)
      this.activeDelete = false
    }
  },
  created () {
    this.fetchAllData()
  }
}
</script>

<style>

.product-section {
  width: 100%;
  height: 100%;
  padding: 0 20px;
}

.delete-dialog {
  width: 450px;
  padding: 10px 25px;
}

.delete-title-dialog {
  color: red;
  font-weight: 600;
  display: flex;
  justify-content: center;
  height: 30px;
  line-height: 30px;
}

.delete-content-dialog {
  text-align: center;
}

.delete-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.delete-actions button {
  font-weight: bold !important;
  width: 170px;
  height: 50px;
}

.dialog-form {
  width: 450px;
  padding: 45px 25px;
}

.dialog-form h1 {
  font-size: 30px;
  font-weight: bold;
}

.error-display {
  width: 100%;
  height: 20px;
  /* background: black; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -5px;
  margin-bottom: 10px;
}

.alert {
  width: 500px;
  padding: 5px 10px !important;

}

.header-product {
  margin-top: 20px;
  padding: 10px;
  font-weight: bold;
  font-size: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
}

.btn-addForm {
  position: absolute;
  right: 0;
  bottom: -10px;
  font-size: 15px;
  padding: 5px 20px;
  border-radius: 5px;
  background: rgb(16, 43, 79);
  color: white;
  cursor: pointer;
  transition: .3s;
}

.btn-addForm:hover {
  background: rgb(13, 68, 140);
}

.image-row {
  overflow: hidden;
  width: 150px !important;
  padding: 10px !important;
}

.image-product {
  width: 100%;
  height: 130px;
}

.image-product img {
  object-fit: contain;
}

.btn-row {
  width: 200px;
}

.action-table {
  margin: 0 auto;
  /* width: 50%; */
  display: flex;
  justify-content: space-around;
}
</style>
