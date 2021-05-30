<script lang='ts'>
  import {onMount} from 'svelte'
  import {Link, Route, Router} from 'svelte-routing'
  import {watchResize} from 'svelte-watch-resize'
  import {ResizeWatcher} from '../types/reseizeWatcher'
  import Home from './Home.svelte'
  import Mentions from './Mentions.svelte'

  export let url = ''

  let headerSize: ResizeWatcher = new ResizeWatcher()
  let footerSize: ResizeWatcher = new ResizeWatcher()
  let burgerOpen: boolean = false

  onMount(async () => {
    footerSize.SetupWatcher(window.innerHeight, 0, 'min-height')
    footerSize.WatchMinimal(document.getElementById('main'))

    headerSize.SetupWatcher(15, 0, 'padding-top')
    headerSize.WatchMargin(document.getElementById('main'))
  })
</script>

<style lang='scss'>
  @import "../styles/main";

  .mask {
    z-index: -1;
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: color(clear);
    opacity: 0.7;
  }

  .main {
    padding: 5rem;
  }

  nav {
    position: fixed !important;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: color(nav);
    z-index: 101;
    width: 100%;
    padding: 1rem;

    :global(a) {
      color: color(clear);
      text-decoration: none;
    }

    :global([aria-current]) {
      cursor: default;
      text-decoration: underline wavy color(lighter);
    }

    @include media-breakpoint-down(md) {
      flex-direction: column;
      display: none;
      height: 100vh;
    }

    @include media-breakpoint-up(md) {
      flex-direction: row;
      display: flex;
    }

    &.open {
      display: flex !important;
    }
  }

  footer {
    background: color(lighter);
    height: 50px;

    :global(a) {
      color: color(clear);
      height: 50px;
    }
  }


  #burger {
    @include media-breakpoint-down(sm) {
      display: block;
    }
    @include media-breakpoint-up(md) {
      display: none;
    }

    width: 30px;
    height: 20px;
    position: fixed;
    top: 10px;
    right: 2rem;
    margin: 0;
    transform: rotate(0deg);
    transition: 0.5s ease-in-out;
    cursor: pointer;
    z-index: 1000;

    background: none;
    border: none;

    .animated {
      span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;
        background: color(lighter);

        &:first-child {
          top: 0;
        }

        &:nth-child(2) {
          top: 10px;
        }

        &:nth-child(3) {
          top: 20px;
        }
      }

      &.open {
        color: #0a53be;

        span {
          &:first-child {
            top: 11px !important;
            transform: rotate(135deg) !important;
          }

          &:nth-child(2) {
            opacity: 0 !important;
            left: -60px !important;
          }

          &:nth-child(3) {
            top: 11px !important;
            transform: rotate(-135deg) !important;
          }
        }
      }
    }
  }
</style>

<div class='mask'></div>
<Router url='{url}'>
  <!-- Navigation link. Hidden by default in low resolution -->
  <nav class="{burgerOpen ? 'open' : ''}" use:watchResize={headerSize.WatchResize}>
    <Link to='/'><img class='logo' height='90px' src='logo.png'></Link>
    <Link to='/users'>Utilisateurs</Link>
    <Link to='/stages'>Stages</Link>
    <Link to='/material'>Matériel</Link>
  </nav>
  <!-- Burger menu :) Hidden by default in low resolution -->
  <button id='burger' on:click={() => {burgerOpen = !burgerOpen}}>
    <div class="animated {burgerOpen ? 'open' : ''}">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </button>
  <!-- This is the place where pages are printed /!\ NEVER HIDE IT-->
  <div class='main' id='main'>
    <Route component={Home} path='/'/>
    <Route component={Mentions} path='/mentions'/>
  </div>
</Router>
