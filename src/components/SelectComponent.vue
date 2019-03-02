<template>
  <div class="select-wrap" @click="open()" ref="selectWrap">
    <label>{{ props.name }}</label>
    <div class="select">
      <div class="value">{{ props.value }}</div>
      <ul class="options" v-if="opened">
        <li v-for="item in props.options" :key="item.id" @click="selected(item)">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    props: {
      type: Object
    }
  },
  data() {
    return {
      opened: false
    };
  },
  methods: {
    open() {
      this.opened = !this.opened;
    },
    selected(val) {
			this.props.value = val;
		},
		documentClick(e) {
      let el = this.$refs.selectWrap;
      let target = e.target;
      if (el !== target && !el.contains(target)) {
        this.opened = false;
      }
    },
	},
	mounted() {
    document.addEventListener("click", this.documentClick);
  },
  destroyed() {
    document.removeEventListener("click", this.documentClick);
  }
};
</script>

<style lang="scss" scoped>
.select-wrap {
  display: flex;
  align-items: center;
  label {
    font-size: 14px;
    color: #888888;
    margin-right: 0.5rem;
    opacity: 0.6;
  }
  .select {
    background: #191919;
    width: 165px;
    height: 35px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 5px;
    position: relative;
    font-size: 14px;
    cursor: pointer;
    color: #888888;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      right: 15px;
      background: url(../assets/images/arrow.png) center center no-repeat;
      width: 10px;
      height: 6px;
    }
    ul {
      position: absolute;
      top: calc(100% - 3px);
      width: 100%;
      background: #191919;
      z-index: 4;
      left: 0;
      margin: 0;
      list-style: none;
      border-radius: 0 0 5px 5px;
      cursor: pointer;
      padding: 0;
      overflow: hidden;
      li {
        padding: 10px;
        height: 36px;
        display: flex;
        align-items: center;
        transition: 0.3s ease;
        &:hover {
          background: #fdd700;
          color: #000000;
        }
      }
    }
  }
}
</style>
