import '../css/animate.css';
import '../css/icomoon.css';
import '../css/ionicons.min.css';
import '../css/bootstrap.min.css';
import '../css/magnific-popup.css';
import '../css/flexslider.css';
import '../css/owl.carousel.min.css';
import '../css/owl.theme.default.min.css';
import '../css/bootstrap-datepicker.css';
import '../fonts/flaticon/font/flaticon.css';
import '../css/style.css';

import type { AppProps } from 'next/app';
import { AuthProvider } from '../src/components/Providers/Auth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
