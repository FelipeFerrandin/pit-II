<script setup lang="ts">
import { computed, ref } from "vue";
import { useApplicationStore } from "@/stores/application";

const lStore = useApplicationStore();

const lHasAccount = ref(true);
const lCountries = ref(["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", `Timor L'Este`, "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"]);
const lIsLogged = computed(() => lStore.isLogged);

</script>

<template>
  <main>
    <v-container>
      <v-card class="pa-5">
        <div class="d-flex justify-end w-100" v-if="!lIsLogged">
          <v-switch v-model="lHasAccount" hide-details color="secondary" label="Do you have account?"></v-switch>
        </div>

        <section v-if="lHasAccount && !lIsLogged">
          <v-text-field
            label="Email"
          ></v-text-field>

          <v-text-field
            label="Password"
          ></v-text-field>

          <div>
            <v-btn class="w-100 " variant="tonal">Login</v-btn>
          </div>
        </section>

        <section v-if="!lHasAccount && !lIsLogged">
          <v-text-field
            label="Email"
          ></v-text-field>

          <v-text-field
            label="Password"
          ></v-text-field>

          <v-text-field
            label="First name"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            label="Last name"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 155 || 'Max 155 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            type="date"
            label="Birth date"
            required
          ></v-text-field>

          <v-text-field
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
            label="Public place"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 255 || 'Max 255 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            label="District"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            label="Number"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 4 || 'Max 4 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            label="Number"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 4 || 'Max 4 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            label="City"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            label="State"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
            required
          ></v-text-field>

          <v-autocomplete
            ref="country"
            :rules="[value => !!value || 'This field is required']"
            :items="lCountries"
            label="Country"
            placeholder="Select..."
            required
          ></v-autocomplete>


          <v-card-title>
            Payment info
          </v-card-title>

          <v-text-field
            label="Credit card number"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 19 || 'Max 19 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            label="Expiration Date"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 5 || 'Max 5 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            label="Card Verification Number"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 4 || 'Max 4 characters'
                ]"
            required
          ></v-text-field>

          <div>
            <v-btn class="w-100 " variant="tonal">Finish</v-btn>
          </div>
        </section>

        <section v-if="lIsLogged">
          <v-card-title>
            Payment info
          </v-card-title>

          <v-text-field
            label="Credit card number"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 19 || 'Max 19 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            label="Expiration Date"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 5 || 'Max 5 characters'
                ]"
            required
          ></v-text-field>

          <v-text-field
            label="Card Verification Number"
            :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 4 || 'Max 4 characters'
                ]"
            required
          ></v-text-field>

          <div>
            <v-btn class="w-100 " variant="tonal">Finish</v-btn>
          </div>
        </section>

      </v-card>
    </v-container>
  </main>
</template>