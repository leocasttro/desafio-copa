<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="container">
    <div class="close-button">
      <fa id="xmark" icon="xmark" @click="onClick"/>
    </div>
    <div class="upload">
      <label></label>
      <input ref="fileInput" type="file"  hidden>
      <img @click="openFileDialog"
      @change="handleFileUpload"
      src="../../assets/upload-banner.png" alt=""
      >
    </div>
    <div class="form-container">
    <form @submit="submitForm">
      <label>Nome do Time:</label>
      <input v-model="name" type="text" id="name" class="name-input" />

      <div class="group-container">
        <div class="item-group">
          <div class="group">
            <label>Número de jogadores:</label>
            <input v-model="players" type="number" id="players" />

            <label>Número de jogadores no ataque:</label>
            <input v-model="attackers" type="number" id="attackers"/>
          </div>
        </div>
        <div class="item-group">
          <div class="group">
            <label>Número de jogadores na defesa:</label>
            <input v-model="defenders" type="number"  id="defenders"/>

            <label>Número de jogadores no meio-campo:</label>
            <input v-model="midfielders" type="number" id="midfielders"/>
          </div>
        </div>
      </div>

      <button type="subimt">SALVAR</button>
    </form>
  </div>
  </div>
</template>

<script>
export default {
  name: 'FormAdd',
  data() {
    return {
      name: null,
      players: null,
      match: [{ matchs: 0, wins: 0, defeats: 0 }],
      attackers: null,
      defenders: null,
      midfielders: null,
      image: null,
    };
  },
  methods: {
    onClick() {
      this.$emit('close');
    },
    openFileDialog() {
      this.$refs.fileInput.click();
    },
    handleFileUpload() {
      const { files } = this.$refs.fileInput;
      this.image = files?.[0];
    },
    async submitForm(event) {
      event.preventDefault();
      const data = {
        name: this.name,
        players: this.players,
        attackers: this.attackers,
        defenders: this.defenders,
        midfielders: this.midfielders,
        match: this.match,
        image: this.image,
      };
      const dataJson = JSON.stringify(data);
      console.log(dataJson);

      await fetch('http://localhost:3000/times', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dataJson,
      });

      // Limpa os dados digitados no formulário
      this.name = '';
      this.players = '';
      this.attackers = '';
      this.defenders = '';
      this.midfielders = '';
    },
  },

};
</script>

<style scoped>

.container {
  width: 592px;
  height: 588px;
  background-color: #1C212D;
}
.close-button {
  font-size: 20px;
  height: 40px;
  margin-right: 30px;
  display: flex;
  justify-content: right;
  align-items: center;
}
.form-container {
  display: flex;
  align-content: center;
  justify-content: center;
}

form {
  width: 550px;
  height: 50%;
  font-size: 14px;
  text-align: left;
  color: aliceblue;
}

img {
  margin: 20px 0 20px 0;
}

.name-input {
  width: 97%;
}

.group-container {
  display: flex;
}

.item-group {
  width: 256px;
  flex: 1;
}

input {
  background: #2B2F40;
  border: 1px solid #191B25;
  color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin: 10px 0;
  width: 256px;
  height: 40px;
}

button {
  margin-top: 20px;
  width: 100%;
  background-color: #F5760F;
  color: aliceblue;
  height: 45px;
  border: none;
}

</style>
