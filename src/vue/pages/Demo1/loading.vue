<template>
  <div class="loading-wrapper">
    <svg
      width="300"
      height="100"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waveGradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
          <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="waveGradBlue1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
          <stop offset="50%" stopColor="#2563eb" stopOpacity="1" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,50 Q75,100 150,50 T300,50"
        fill="none"
        stroke="url(#waveGradBlue)"
        strokeWidth="2"
      >
        <animate
          attributeName="d"
          values="M0,50 Q75,100 150,50 T300,50; M0,50 Q75,0 150,50 T300,50; M0,50 Q75,100 150,50 T300,50"
          dur="4s"
          begin="0s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M0,50 Q75,0 150,50 T300,50"
        fill="none"
        stroke="url(#waveGradBlue1)"
        strokeWidth="2"
      >
        <animate
          attributeName="d"
          values="M0,50 Q75,0 150,50 T300,50; M0,50 Q75,100 150,50 T300,50; M0,50 Q75,0 150,50 T300,50"
          dur="4s"
          begin="0s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
</template>

<style scoped>
.loading-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #070a0e;
}
</style>
