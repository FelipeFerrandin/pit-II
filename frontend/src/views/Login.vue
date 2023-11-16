<script setup lang="ts">
import { useApplicationStore } from "@/stores/application";
import { ref } from "vue";
import { AuthDTO, AuthLoginDTO } from "@/domains/auth/AuthDTO";
import AuthHTTPAPI from "@/domains/auth/AuthHTTPAPI";
import { useRouter } from "vue-router";
import CustomerHTTPAPI from "@/domains/customer/CustomerHTTPAPI";
import { CustomerCreateCompleteDTO } from "@/domains/customer/CustomerDTO";

const lStore = useApplicationStore();
const lRouter = useRouter();

const lHasAccount = ref(true);
const lCountries = ref(["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", `Timor L'Este`, "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"]);
const lAuthLoginDTO = ref(new AuthLoginDTO());
const lCreateCustomer = ref(new CustomerCreateCompleteDTO());
const lIsCreating = ref(false);

function login() {
  auth(lAuthLoginDTO.value);
}

function auth(aAuthLogin: AuthLoginDTO) {
  new AuthHTTPAPI().login(aAuthLogin).then((r) => {
    const lAuthDTO: AuthDTO = r.data;
    lStore.login(lAuthDTO.access_token);
    findCustomer(lAuthDTO.id_customer);
    lRouter.push({ path: "/account" });
  }).catch((e) => {
    lStore.showSnackbar(e);
  });
}

function findCustomer(aIdCustomer: number) {
  new CustomerHTTPAPI().getCustomerById(aIdCustomer).then(r => {
    lStore.setCustomer(r.data);
  }).catch(e => {
    lStore.showSnackbar(e);
  });
}

function createCustomer() {
  lIsCreating.value = true;
  new CustomerHTTPAPI().createCustomer(lCreateCustomer.value).then(r => {
    setTimeout(() => {
      auth({
        email: lCreateCustomer.value.customer.email,
        password: lCreateCustomer.value.customer.password
      });
    }, 1000);
    lStore.showSnackbar("Customer created with success!!");
  }).catch(e => {
    lStore.showSnackbar(e);
    lIsCreating.value = false;
  }).finally(() => {
    lIsCreating.value = false;
  });
}

</script>

<template>
  <main>
    <v-container>
      <v-card class="pa-5">
        <div class="d-flex justify-end w-100">
          <v-switch v-model="lHasAccount" hide-details color="secondary" label="Do you have account?"></v-switch>
        </div>

        <section v-if="lHasAccount">
          <v-text-field
            v-model="lAuthLoginDTO.email"
            label="Email"
            type="email"
          ></v-text-field>

          <v-text-field
            v-model="lAuthLoginDTO.password"
            type="password"
            label="Password"
          ></v-text-field>

          <div>
            <v-btn class="w-100 " variant="tonal" @click="login">Login</v-btn>
          </div>
        </section>

        <section v-if="!lHasAccount">
          <v-text-field
            v-model="lCreateCustomer.customer.email"
            label="Email"
            type="email"
          ></v-text-field>

          <v-text-field
            v-model="lCreateCustomer.customer.password"
            type="password"
            label="Password"
          ></v-text-field>

          <v-text-field
            v-model="lCreateCustomer.customer.name"
            label="First name"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            v-model="lCreateCustomer.customer.last_name"
            label="Last name"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 155 || 'Max 155 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            v-model="lCreateCustomer.customer.birth_date"
            type="date"
            label="Birth date"
            required
          ></v-text-field>

          <v-text-field
            v-model="lCreateCustomer.customer.phone_number"
            label="Phone"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 20 || 'Max 20 characters'
                ]"
            required
          ></v-text-field>

          <v-card-title>
            Address
          </v-card-title>

          <v-text-field
            v-model="lCreateCustomer.address.public_place"
            label="Public place"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 255 || 'Max 255 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            v-model="lCreateCustomer.address.district"
            label="District"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            v-model.number="lCreateCustomer.address.number"
            label="Number"
            :rules="[
                  value => !!value || 'Required.'
                ]"
            required
          ></v-text-field>


          <v-text-field
            label="City"
            v-model="lCreateCustomer.address.city"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            label="State"
            v-model="lCreateCustomer.address.state"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
            required
          ></v-text-field>

          <v-autocomplete
            ref="country"
            v-model="lCreateCustomer.address.country"
            :rules="[value => !!value || 'This field is required']"
            :items="lCountries"
            label="Country"
            placeholder="Select..."
            required
          ></v-autocomplete>
          <div>
            <v-btn class="w-100" variant="tonal" @click="createCustomer" :loading="lIsCreating">Finish</v-btn>
          </div>
        </section>

      </v-card>
    </v-container>
  </main>
</template>
