/**
 * Content + metadata for the SEO landing pages.
 * Pure data (no React / DOM imports) so it can be used by BOTH the React pages
 * and the build-time prerender plugin (plugins/seoPages.ts).
 */
export const SITE_URL = 'https://qrcode012.vercel.app';
export const SITE_NAME = 'QR Code Studio';

export interface Item { title: string; text: string }
export interface Faq { q: string; a: string }
export interface LandingPage {
  slug: 'website' | 'wifi' | 'contact' | 'email';
  path: string;
  navLabel: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  notice?: string;
  toolHeading: string;
  stepsHeading: string;
  steps: Item[];
  benefitsHeading: string;
  benefits: Item[];
  useCasesHeading: string;
  useCases: Item[];
  tipsHeading: string;
  tips: string[];
  faqHeading: string;
  faqs: Faq[];
  cardBlurb: string;
}

const website: LandingPage = {
  slug: 'website',
  path: '/website-qr-code',
  navLabel: 'Website QR Code',
  title: 'Free Website QR Code Generator – URL to QR | QR Code Studio',
  description:
    'Create a free website QR code in seconds. Paste any URL, customize colors and add a logo, then download a PNG or SVG. No sign-up and no watermark.',
  h1: 'Website QR Code Generator',
  intro:
    'Turn any web address into a QR code that opens the page when scanned. Paste your link, style the code to match your brand and download it as a PNG or SVG. The code is created in your browser, so your URL is never uploaded.',
  toolHeading: 'Create your website QR code',
  stepsHeading: 'How to create a QR code for a website',
  steps: [
    { title: 'Enter your website URL', text: 'Type or paste the full address of the page you want to link to. If you leave out https://, we add it for you.' },
    { title: 'Generate the code', text: 'Select Generate QR Code. The preview appears right away and updates as you adjust the design.' },
    { title: 'Customize the design', text: 'Pick foreground and background colors, set the size and margin, and optionally add a small logo in the center.' },
    { title: 'Download and test', text: 'Save the code as a PNG for screens and documents or an SVG for print, then scan it with a phone before you share it.' },
  ],
  benefitsHeading: 'Why use a free URL QR code generator',
  benefits: [
    { title: 'Free, with no sign-up', text: 'No account, no watermark and no limit on how often a code you downloaded can be scanned.' },
    { title: 'Does not expire', text: 'The link is encoded directly in the image, so the code keeps working for as long as the page it points to does.' },
    { title: 'Print-ready SVG', text: 'Vector downloads stay sharp on business cards, posters and packaging at any size.' },
    { title: 'Private by design', text: 'Generation happens in your browser, so the links you enter are not sent to our servers.' },
  ],
  useCasesHeading: 'What people use website QR codes for',
  useCases: [
    { title: 'Print materials', text: 'Link flyers, brochures and business cards to a landing page or portfolio.' },
    { title: 'Packaging and products', text: 'Send customers to setup guides, manuals or reorder pages.' },
    { title: 'Menus and signage', text: 'Point table cards and shop windows to a menu, booking page or offer.' },
    { title: 'Events and presentations', text: 'Let attendees open slides, schedules or sign-up forms from their seats.' },
    { title: 'Social profiles and reviews', text: 'Share a profile, app store listing or review page without a long link.' },
  ],
  tipsHeading: 'Tips for a website QR code that scans reliably',
  tips: [
    'Use the shortest URL that works. Fewer characters make a simpler code that is easier to scan at small sizes.',
    'Link to a mobile-friendly page, since most people will scan with a phone.',
    'Keep strong contrast with a dark code on a light background, and leave the margin around it.',
    'Add UTM parameters to the URL if you want to see QR visits in your analytics. This generator creates static codes and does not track scans itself.',
    'Print a test at the final size and scan it before ordering a large batch.',
  ],
  faqHeading: 'Website QR code FAQ',
  faqs: [
    { q: 'How do I create a QR code for a website?', a: 'Enter the page address in the URL field, select Generate QR Code, adjust the colors or size if you want, and download the PNG or SVG. Scan it with your phone to confirm it opens the right page.' },
    { q: 'Is this website QR code generator free?', a: 'Yes. You can create and download as many codes as you like without an account or watermark.' },
    { q: 'Will my QR code stop working after some time?', a: 'No. The URL is stored directly in the code, so the code itself never expires. It only stops being useful if the page it points to goes offline or moves.' },
    { q: 'Can I change the link after I print the code?', a: 'No. A static code cannot be edited after it is created. If you expect the destination to change, point the code at an address you control, such as a page on your own site that redirects to the current content.' },
    { q: 'Can I see how many people scan my code?', a: 'Not from this tool, because the codes are static and do not report scans. You can add UTM parameters to your URL and review the visits in your website analytics.' },
    { q: 'Should I download a PNG or an SVG?', a: 'Use PNG for websites, documents and social posts. Use SVG for print, since it scales to any size without losing sharpness.' },
  ],
  cardBlurb: 'Turn any link into a scannable code.',
};

const wifi: LandingPage = {
  slug: 'wifi',
  path: '/wifi-qr-code',
  navLabel: 'WiFi QR Code',
  title: 'WiFi QR Code Generator – Free & Private | QR Code Studio',
  description:
    'Create a WiFi QR code so guests can join your network with one scan. Enter SSID, password and security type, then download free. Generated in your browser.',
  h1: 'WiFi QR Code Generator',
  intro:
    'Stop reading out long passwords. Enter your network name, password and security type to create a WiFi QR code that lets phones join with a single scan. Everything is generated in your browser, so your credentials stay on your device.',
  notice:
    'Anyone who scans this QR code can see and use the network details stored in it. Share it only with people you trust, and consider using a separate guest network.',
  toolHeading: 'Create your WiFi QR code',
  stepsHeading: 'How to create a WiFi QR code',
  steps: [
    { title: 'Enter the network name', text: 'Type your SSID exactly as it appears on your devices. Network names are case-sensitive.' },
    { title: 'Choose the security type', text: 'Most home and office routers use WPA/WPA2/WPA3. Choose None only for an open network without a password.' },
    { title: 'Add the password', text: 'Enter your WiFi password, and tick Hidden network if your router does not broadcast its name.' },
    { title: 'Generate, download and test', text: 'Create the code, download it as a PNG or SVG, and scan it with a phone to confirm it connects before you print.' },
  ],
  benefitsHeading: 'Benefits of sharing WiFi with a QR code',
  benefits: [
    { title: 'No typing mistakes', text: 'Guests skip long passwords full of look-alike characters.' },
    { title: 'Faster for everyone', text: 'A scan replaces reading out and typing the network name and password.' },
    { title: 'Works without an app', text: 'Recent iPhones and most Android phones can join from the camera app.' },
    { title: 'Free and private', text: 'No account is needed, and your details are not uploaded.' },
  ],
  useCasesHeading: 'Where a WiFi QR code helps',
  useCases: [
    { title: 'At home', text: 'Let visitors join without interrupting what you are doing.' },
    { title: 'Rentals and guesthouses', text: 'Put the code in a welcome folder or on the fridge for arriving guests.' },
    { title: 'Cafés and waiting rooms', text: 'Display a sign so customers connect without asking staff.' },
    { title: 'Offices and coworking spaces', text: 'Give visitors guest access at reception, ideally on a separate network.' },
    { title: 'Events and classrooms', text: 'Share a temporary network with a whole room at once.' },
  ],
  tipsHeading: 'Tips for sharing WiFi safely',
  tips: [
    'Use a guest network where your router offers one, so visitors never reach your main devices.',
    'If you change your WiFi password or network name, generate and print a new code. The old one stops working.',
    'Treat a printed code like a written password and place it where only the people you intend can see it.',
    'Double-check capitalization and spaces in your network name and password. Special characters are handled for you, but typos are not.',
    'Test on both an iPhone and an Android phone if you can.',
  ],
  faqHeading: 'WiFi QR code FAQ',
  faqs: [
    { q: 'How do I create a WiFi QR code?', a: 'Enter your network name (SSID), choose the security type, add the password and select Generate QR Code. Then download the image and scan it with a phone to test it.' },
    { q: 'Is it safe to make a WiFi QR code online?', a: 'This generator runs in your browser, so the network name and password are not sent to our servers. The code itself contains the password, though, so anyone who scans or photographs it can join your network.' },
    { q: 'Which security type should I choose?', a: 'Choose WPA/WPA2/WPA3 for almost all modern routers, WEP only for very old equipment, and None for an open network. You can check the setting in your router configuration. Support for WPA3-only networks can vary between phones.' },
    { q: 'What does the hidden network option do?', a: 'Tick it if your router does not broadcast its network name. The code then tells the phone to look for the network directly so it can connect.' },
    { q: 'Which phones can scan a WiFi QR code?', a: 'Recent iPhones and most Android phones can scan it with the built-in camera and offer to join the network. Older devices may need a separate QR scanner app.' },
    { q: 'What happens if I change my WiFi password?', a: 'The QR code keeps the old password, so it will no longer connect. Create a new code with the updated password and replace the old one.' },
  ],
  cardBlurb: 'Let guests join your network with one scan.',
};

const contact: LandingPage = {
  slug: 'contact',
  path: '/contact-qr-code',
  navLabel: 'Contact QR Code',
  title: 'Contact QR Code Generator – Free vCard QR Code | QR Code Studio',
  description:
    'Make a vCard QR code that saves your name, phone, email and company to a phone contact list with one scan. Free, no sign-up, and generated in your browser.',
  h1: 'Contact QR Code Generator',
  intro:
    'Create a vCard QR code that saves your contact details straight into a phone. Add your name, phone number, email, company and more, then download the code for your business card, badge or email signature. Your details stay in your browser while you create it.',
  toolHeading: 'Create your contact QR code',
  stepsHeading: 'How to create a vCard QR code',
  steps: [
    { title: 'Enter your name or company', text: 'You need at least a name or a company. Add a first and last name for the best result in contact lists.' },
    { title: 'Add contact details', text: 'Fill in the phone number, email, job title, website and address you want to share. Leave out anything you prefer to keep private.' },
    { title: 'Generate and style the code', text: 'Select Generate QR Code, then choose colors, size and error correction to suit where it will appear.' },
    { title: 'Download and test', text: 'Save a PNG or SVG, scan it with your phone and confirm it offers to add a new contact with the right details.' },
  ],
  benefitsHeading: 'Why share contact details with a QR code',
  benefits: [
    { title: 'Saved in one scan', text: 'A phone can create a contact entry without anyone typing your details.' },
    { title: 'No app needed', text: 'The camera or scanner on most modern phones recognizes vCard codes.' },
    { title: 'Fewer mistakes', text: 'Names, numbers and email addresses arrive exactly as you entered them.' },
    { title: 'Free and private', text: 'No account is required and your details are not uploaded to our servers.' },
  ],
  useCasesHeading: 'Where contact QR codes are useful',
  useCases: [
    { title: 'Business cards', text: 'Add a code to the back so people can save you without retyping.' },
    { title: 'Conferences and name badges', text: 'Make networking quicker at events and trade shows.' },
    { title: 'Email signatures and websites', text: 'Let readers scan your details straight from a screen.' },
    { title: 'Shop windows and vehicles', text: 'Give customers a way to save your number for later.' },
    { title: 'Resumes and portfolios', text: 'Make it easy for recruiters to save your contact details.' },
  ],
  tipsHeading: 'Tips for a contact QR code that scans well',
  tips: [
    'Keep it short. Every extra field adds data and makes the pattern denser, which is harder to scan when printed small.',
    'Share only what you want the public to see. Anyone who scans a printed code can read everything in it.',
    'Use a business phone number and email rather than personal ones where possible.',
    'Print at a comfortable size, and make it larger if the code looks crowded.',
    'Test with both an iPhone and an Android phone, since contact apps handle fields slightly differently.',
  ],
  faqHeading: 'Contact QR code FAQ',
  faqs: [
    { q: 'What is a vCard QR code?', a: 'It is a QR code that contains contact details in the vCard format. When someone scans it, their phone offers to save the details as a new contact.' },
    { q: 'Which details can I include?', a: 'You can include a name, phone number, email, company, job title, website and address. A name or company is required, and every other field is optional.' },
    { q: 'Can I update my details after printing the code?', a: 'No. The details are stored in the code itself, so any change needs a new QR code. Reprint it if your phone number or email changes.' },
    { q: 'Are my contact details stored on your servers?', a: 'No. The code is generated in your browser and your details are not uploaded.' },
    { q: 'Why is my contact QR code hard to scan?', a: 'Codes with many long fields are dense. Remove optional fields such as the address, increase the size, or choose a lower error correction level to make the pattern simpler.' },
    { q: 'Will it work on iPhone and Android?', a: 'Modern iPhones and Android phones can read vCard codes with the camera or a scanner app. How the contact is shown and saved can differ slightly between devices.' },
  ],
  cardBlurb: 'Share a vCard that saves straight to a phone.',
};

const email: LandingPage = {
  slug: 'email',
  path: '/email-qr-code',
  navLabel: 'Email QR Code',
  title: 'Email QR Code Generator – Create Free | QR Code Studio',
  description:
    'Create an email QR code that opens a new message with your address, subject and text already filled in. Free PNG and SVG downloads, no sign-up needed.',
  h1: 'Email QR Code Generator',
  intro:
    'Create a QR code that opens a new email draft when scanned. Set the recipient and, if you like, a subject line and starting message, then download the code. It suits feedback, support and RSVPs, and it is generated entirely in your browser.',
  toolHeading: 'Create your email QR code',
  stepsHeading: 'How to create a QR code for email',
  steps: [
    { title: 'Enter the email address', text: 'Type the address that should receive the message. Use a shared address such as support@ if you do not want to publish a personal inbox.' },
    { title: 'Add a subject and message (optional)', text: 'A prefilled subject helps you sort replies. A short starting message can guide what people write.' },
    { title: 'Generate and style the code', text: 'Select Generate QR Code and adjust the colors, size and margin if needed.' },
    { title: 'Download and test', text: 'Save the PNG or SVG, scan it with a phone, and check that your email app opens a draft with the right details.' },
  ],
  benefitsHeading: 'Benefits of an email QR code',
  benefits: [
    { title: 'One scan to a ready draft', text: 'The recipient, subject and message are filled in, so people only need to write and send.' },
    { title: 'No typos in your address', text: 'Messages reach the right inbox every time.' },
    { title: 'Consistent subject lines', text: 'Prefilled subjects make incoming mail easier to sort and route.' },
    { title: 'Free and private', text: 'No sign-up is needed and the details are not sent to our servers.' },
  ],
  useCasesHeading: 'Where email QR codes work well',
  useCases: [
    { title: 'Customer support', text: 'Print one on packaging or manuals with a subject such as Support request.' },
    { title: 'Feedback', text: 'Add one to receipts, menus or table cards to collect comments.' },
    { title: 'Event RSVPs', text: 'Let guests confirm attendance from an invitation or poster.' },
    { title: 'Lost-and-found tags', text: 'Let finders contact you without exposing a phone number.' },
    { title: 'Job and enquiry posters', text: 'Make it easy to apply or ask a question from a noticeboard.' },
  ],
  tipsHeading: 'Tips for an email QR code that works',
  tips: [
    'Keep the subject and message short. Long text makes the code denser and harder to scan.',
    'Remember that anyone who scans the code can read the address. A role-based address keeps spam away from your personal inbox.',
    'The code opens a draft in the default email app on the phone, and the sender still has to press Send.',
    'Stick to plain text in the message, since formatting is not carried across.',
    'Test with a phone that has an email app set up.',
  ],
  faqHeading: 'Email QR code FAQ',
  faqs: [
    { q: 'How does an email QR code work?', a: 'It stores a mailto link. When scanned, the phone opens its email app with a new message addressed to your recipient, with any subject and text you added already filled in.' },
    { q: 'Can I add a subject and message?', a: 'Yes. Both are optional. Keep them short so the QR code stays easy to scan.' },
    { q: 'Does scanning the code send an email automatically?', a: 'No. It only opens a draft. The person scanning must review it and press Send.' },
    { q: 'Can people see my email address in the QR code?', a: 'Yes. The address is part of the code, so anyone who scans it can read it. Choose an address you are comfortable sharing publicly.' },
    { q: 'Will the code work on any phone?', a: 'Most modern phones can scan it with the camera and open their default email app. If no email app is set up on the phone, it may not be able to create the message.' },
    { q: 'Can I change the email address later?', a: 'No. The address is stored in the code, so you need to create a new code if it changes.' },
  ],
  cardBlurb: 'Open a ready-to-send email draft with one scan.',
};

export const LANDING = { website, wifi, contact, email } as const;
export const LANDING_LIST: LandingPage[] = [website, wifi, contact, email];
