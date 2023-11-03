<script setup lang="ts">
import { ref } from "vue";

const lPasswordVisible = ref(false);
const lNewPasswordVisible = ref(false);

const lCountries = ref(["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", `Timor L'Este`, "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"])
</script>

<template>
  <v-btn variant="text" icon="mdi-arrow-left" @click="this.$router.push('/account');" class="ml-2 mt-2"></v-btn>
  <main>
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6">
          <v-card title="Account" class="pa-2">
            <v-text-field
              class="px-3"
              label="Email"
              disabled
              type="email"
            ></v-text-field>

            <v-text-field
              class="px-3"
              label="First name"
              :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
              required
            ></v-text-field>

            <v-text-field
              class="px-3"
              label="Last name"
              :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 155 || 'Max 155 characters'
                ]"
              required
            ></v-text-field>

            <v-text-field
              type="date"
              class="px-3"
              label="Birth date"
              required
            ></v-text-field>

            <v-text-field
              class="px-3"
              label="Phone"
              :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 20 || 'Max 20 characters'
                ]"
              required
            ></v-text-field>

            <div class="px-3">
              <v-btn class="w-100 " variant="tonal">Update</v-btn>
            </div>

            <v-card-title>
              Password
            </v-card-title>

            <v-text-field
              class="px-3"
              :append-icon="lPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
              :type="lPasswordVisible ? 'text' : 'password'"
              label="Password"
              @click:append="lPasswordVisible = !lPasswordVisible"
            ></v-text-field>

            <v-text-field
              class="px-3"
              :append-icon="lNewPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
              :type="lNewPasswordVisible ? 'text' : 'password'"
              label="New password"
              @click:append="lNewPasswordVisible = !lNewPasswordVisible"
            ></v-text-field>

            <div class="pa-3">
              <v-btn class="w-100 " variant="tonal">Update password</v-btn>
            </div>

          </v-card>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6">
          <v-card title="Account Address">

            <v-text-field
              class="px-3"
              label="Public place"
              :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 255 || 'Max 255 characters'
                ]"
              required
            ></v-text-field>

            <v-text-field
              class="px-3"
              label="District"
              :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
              required
            ></v-text-field>

            <v-text-field
              class="px-3"
              label="Number"
              :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 4 || 'Max 4 characters'
                ]"
              required
            ></v-text-field>

            <v-text-field
              class="px-3"
              label="Number"
              :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 4 || 'Max 4 characters'
                ]"
              required
            ></v-text-field>

            <v-text-field
              class="px-3"
              label="City"
              :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
              required
            ></v-text-field>

            <v-text-field
              class="px-3"
              label="State"
              :rules="[
                  value => !!value || 'Required.',
                  value => (value || '').length <= 100 || 'Max 100 characters'
                ]"
              required
            ></v-text-field>

            <v-autocomplete
              class="px-3"
              ref="country"
              :rules="[value => !!value || 'This field is required']"
              :items="lCountries"
              label="Country"
              placeholder="Select..."
              required
            ></v-autocomplete>

            <div class="pa-3">
              <v-btn class="w-100 " variant="tonal">Update</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
