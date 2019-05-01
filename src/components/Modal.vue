<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
        <div class="md-modal-inner">
          <!--<div class="md-top">-->
            <!--<button class="md-close" @click="closeModal">Close</button>-->
          <!--</div>-->
          <div class="md-content">
            <div class="confirm-tips">
              <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
              <slot name="btnGroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="mdShow" @click="closeModal">
        <h1>哈哈哈</h1>
      </div>
    </div>
</template>
<style scoped>
  .md-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 535px;
    height: auto;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    visibility: hidden;
    z-index: 201;
    opacity: 0.8;
  }

  .md-modal.md-modal-m {
    width: 620px;
  }

  .md-modal .md-close {
    position: absolute;
    top: 7px;
    right: 7px;
    width: 34px;
    height: 34px;
    -webkit-transform: scale(0.5);
    -ms-transform: scale(0.5);
    transform: scale(0.5);
    text-indent: -8000px;
  }

  .md-modal .md-close:before, .md-modal .md-close:after {
    position: absolute;
    top: 16px;
    left: -4px;
    content: "";
    width: 44px;
    height: 3px;
    background: #d7d8dd;
    -webkit-transition: -webkit-transform .5s ease-out;
    transition: -webkit-transform .5s ease-out;
    transition: transform .5s ease-out;
    transition: transform .5s ease-out, -webkit-transform .5s ease-out;
  }

  .md-modal .md-close:before {
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .md-modal .md-close:after {
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .md-modal .md-close:hover:before, .md-modal .md-close:hover:after {
    -webkit-transition: -webkit-transform .3s ease-out;
    transition: -webkit-transform .3s ease-out;
    transition: transform .3s ease-out;
    transition: transform .3s ease-out, -webkit-transform .3s ease-out;
  }

  .md-modal .md-close:hover:before {
    -webkit-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }

  .md-modal .md-close:hover:after {
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .md-modal .md-tit {
    font-weight: 200;
    line-height: 1.8em;
    text-align: center;
  }

  .md-modal .md-modal-inner {
    padding: 60px 50px;
  }

  .md-modal .btn-wrap {
    margin-top: 20px;
    text-align: center;
    font-size: 0;
  }

  .md-modal .btn-wrap .btn {
    width: 45%;
    min-width: 80px;
    margin: 0 2.5%;
  }

  .md-modal .confirm-tips, .md-modal .alert-tips {
    font-size: 14px;
    font-weight: 200;
    text-align: center;
  }

  .md-modal .confirm-tips p, .md-modal .alert-tips p {
    line-height: 1.8em;
  }

  .md-modal .confirm-tips {
    min-height: 5.65em;
  }

  .md-modal .alert-tips {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 10.25em;
    -ms-flex-align: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .md-modal .alert-tips p {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }

  .md-modal.modal-normal .content-tit {
    margin-bottom: 20px;
    line-height: 20px;
    font-size: 16px;
    color: #333;
  }

  .md-modal .icon-status-ok {
    width: 20px;
    height: 20px;
    fill: #ee7a23;
    vertical-align: middle;
    margin-right: 15px;
  }

  .md-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../assets/03.jpg") no-repeat 0 0;
    z-index: 200;
    text-align: center;
    color:#86EA4E;
  }

  .md-modal-transition .md-modal-inner {
    background: #b5daf7;
    color: red;
    font-size: 50px;
    border-bottom-left-radius:10px ;
    border-top-left-radius:10px ;
    border-top-right-radius:10px ;
    border: 2px solid darkcyan;
    border-bottom-right-radius:10px ;
    -webkit-transform: translateY(20%);
    -ms-transform: translateY(20%);
    transform: translateY(20%);
    opacity: 0;
    -webkit-transition: all .3s ease-out;
    transition: all .3s ease-out;
  }

  .md-modal-transition.md-show {
    visibility: visible;
  }

  .md-modal-transition.md-show .md-modal-inner {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
  }
</style>
<script>
    export default{
        props:["mdShow"],
        data(){
            return{
                msg:'hello vue'
            }
        },
        methods:{
          closeModal(){
            this.$emit("close");
          }
        }
    }
</script>
