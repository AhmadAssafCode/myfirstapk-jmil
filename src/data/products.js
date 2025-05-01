// src/data/products.js
export const categories = [
  { id: 1, name: 'الألبان والأجبان', icon: 'https://img.freepik.com/premium-photo/dairy-products-wooden-base-dark-background-with-copy-space-vertical-format_138656-769.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 2, name: 'خضروات ', icon: 'https://img.freepik.com/premium-photo/assortment-fresh-raw-vegetables-wooden-box-against-black-background-organic-local-food_106630-917.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 3, name: 'فواكه', icon: 'https://img.freepik.com/premium-photo/tropical-fruits-splashes-water-black-background_483632-169.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 4, name: 'لحوم وأسماك', icon: 'https://img.freepik.com/premium-photo/close-up-fresh-raw-white-red-meat-background-with-vegetables_488220-4492.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 5, name: 'معلبات', icon: 'https://img.freepik.com/premium-photo/top-view-food-packaged-can_926199-4173936.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 6, name: 'المخبوزات', icon: 'https://img.freepik.com/free-photo/sliced-bread-with-turkish-bagel-side-view-white-gray-surface_176474-6215.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 7, name: 'وجبات خفيفة', icon: 'https://cdn.salla.sa/ArNXY/RNght41zpc1so4NKbGlYfkdedb1UsZo2vyKf0vId.jpg' },
  { id: 8, name: 'زيوت', icon: 'https://img.freepik.com/premium-photo/set-different-oils-white-background_185193-56126.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 9, name: 'مياه', icon: 'https://img.freepik.com/free-photo/ice-cubes-bottles-water-front-view_23-2148728779.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 10, name: 'شوكولاتة وسكاكر', icon: 'https://img.freepik.com/free-psd/box-chocolate-candies-isolated-transparent-background_191095-17385.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 11, name: 'عصائر ومشروبات غازية', icon: 'https://img.freepik.com/free-photo/immunity-boosting-food-healthy-lifestyle-with-citrus_23-2149211498.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 12, name: 'توابل وبهارات', icon: 'https://img.freepik.com/free-photo/top-view-spoons-bowls-with-spices_23-2148583712.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 13, name: 'قهوة والشاي', icon: 'https://img.freepik.com/free-photo/coffee-preparation-concept-still-life_23-2150354592.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 14, name: 'لوازم منزلية', icon: 'https://img.freepik.com/premium-photo/cleaning-items-basket-isolated-white-background_93675-122107.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 15, name: 'مجمدات', icon: 'https://img.freepik.com/premium-photo/container-frozen-vegetables-gray-table_243391-118.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
  { id: 16, name: 'الدخان', icon: 'https://img.freepik.com/free-photo/frame-cigarettes_23-2148585886.jpg?ga=GA1.1.1977998895.1746117878&semt=ais_hybrid&w=740' },
];

// Create a mapping of category names to IDs for easier reference
const categoryNameToId = {};
categories.forEach(category => {
  categoryNameToId[category.name] = category.id;
});

// تعريف الشركات المصنعة - تم نقلها إلى ملف partners.js
// استيراد من ملف partners.js
import { manufacturers as brands } from './partners';

// المنتجات بدون خصومات
export const products = [
  {
    id: 1,
    name: '  حليب كامل الدسم 1 لتر ' ,
    description:
      'حليب طازج كامل الدسم من إنتاج شركة الجنيدي، مصدر غني للكالسيوم والبروتين. منتج فلسطيني عالي الجودة مناسب للاستهلاك اليومي.',
    price: 6,
    image: 'https://dokan.ps/wp-content/uploads/2020/12/%D8%A7%D9%84%D8%AC%D9%86%D9%8A%D8%AF%D9%8A-%D8%AD%D9%84%D9%8A%D8%A8-%D8%B7%D8%A7%D8%B2%D8%AC-%D9%83%D8%A7%D9%85%D9%84-%D8%A7%D9%84%D8%AF%D8%B3%D9%85-1L.jpg',
    categoryId: 1, // Updated to match الألبان والأجبان category ID
    categoryName: 'الألبان والأجبان',
    brandId: 1,
    brandName: 'الجنيدي',
    isHealthy: true,
    popularity: 4.5,
    nutrition: {
      calories: 150,
      protein: 8,
      carbs: 12,
      fat: 8,
    },
    recipes: [
      {
        title: 'بودنج الحليب',
        description: 'حلوى لذيذة وسهلة التحضير',
      },
      {
        title: 'كابتشينو',
        description: 'مشروب ساخن ولذيذ',
      },
    ],
  },
  {
    id: 2,
    name: 'جبن أبيض بلدي',
    description:
      'جبن أبيض بلدي من إنتاج شركة الجبريني، مصنوع من حليب الأغنام الطازج. منتج فلسطيني تقليدي بنكهة مميزة.',
    price: 18,
    image: 'https://dokan.ps/wp-content/uploads/2021/01/B-131-20201114114059-270x270-1.jpg',
    categoryId: 1, // Updated to match الألبان والأجبان category ID
    categoryName: 'الألبان والأجبان',
    brandId: 1,
    brandName: 'الجنيدي',
    isHealthy: true,
    popularity: 4.7,
    nutrition: {
      calories: 90,
      protein: 6,
      carbs: 1,
      fat: 7,
    },
  },
  {
    id: 3,
    name: ' لحم عجل طازج واحد كيلو',
    description:
      'لحم عجل طازج من مزارع فلسطينية محلية، يتم ذبحه وتجهيزه حسب الشريعة الإسلامية. لحم عالي الجودة مناسب للشوي والطبخ.',
    price: 55,
    image: 'https://www.palbazaar.com/image/cache/catalog/productimage/270125-500x500.jpg',
    categoryId: 4, // Updated to match لحوم وأسماك category ID
    categoryName: 'لحوم وأسماك',
    brandId: 5,
    brandName: 'الطازج',
    isHealthy: true,
    popularity: 4.3,
    nutrition: {
      calories: 250,
      protein: 26,
      carbs: 0,
      fat: 17,
    },
    recipes: [
      {
        title: 'مقلوبة باللحم',
        description: 'طبق فلسطيني تقليدي شهير',
      },
      {
        title: 'يخنة الخضار باللحم',
        description: 'وصفة صحية وشهية للغداء',
      },
    ],
  },
  {
    id: 4,
    name: 'عصير برتقال كابي لتر ونص',
    description:
      'عصير برتقال من إنتاج شركة كابي، مصنوع من برتقال فلسطيني .',
    price: 5,
    image: 'https://dokan.ps/wp-content/uploads/2021/01/%D9%83%D8%A7%D8%A8%D9%8A-%D8%A8%D8%B1%D8%AA%D9%82%D8%A7%D9%84-1.5-%D9%84%D8%AA%D8%B1-scaled.jpg',
    categoryId: 11, // Updated to match عصائر ومشروبات غازية category ID
    categoryName: 'عصائر ومشروبات غازية',
    brandId: 7,
    brandName: 'كابي',
    isHealthy: true,
    popularity: 4.8,
    nutrition: {
      calories: 112,
      protein: 2,
      carbs: 26,
      fat: 0,
    },
  },
  {
    id: 5,
    name: 'لبنة بلدية - 900 غرام',
    description:
      'لبنة بلدية أصلية من إنتاج شركة الجنيدي، مصنوعة من حليب الماعز الفلسطيني. لبنة كريمية بنكهة تقليدية مميزة.',
    price: 17,
    image: 'https://dokan.ps/wp-content/uploads/2020/12/%D9%84%D8%A8%D9%86%D8%A9-%D8%A7%D9%84%D8%AC%D9%86%D9%8A%D8%AF%D9%8A-%D8%B9%D9%84%D8%A8-900%D8%BA%D9%85.png',
    categoryId: 1, // Updated to match الألبان والأجبان category ID
    categoryName: 'الألبان والأجبان',
    brandId: 1,
    brandName: 'الجنيدي',
    isHealthy: true,
    popularity: 4.6,
    nutrition: {
      calories: 90,
      protein: 5,
      carbs: 4,
      fat: 6,
    },
  },
  {
    id: 6,
    name: ' دجاج طازج كامل سعر الكيلو',
    description:
      'دجاج فلسطيني طازج كامل من مزارع محلية، تم تربيته بدون هرمونات أو مضادات حيوية. مذبوح على الطريقة الإسلامية.',
    price: 10.5,
    image: 'https://dokan.ps/wp-content/uploads/2020/12/%D8%AF%D8%AC%D8%A7%D8%AC-%D9%83%D8%A7%D9%85%D9%84.png',
    categoryId: 4, // Updated to match لحوم وأسماك category ID
    categoryName: 'لحوم وأسماك',
    brandId: 5,
    brandName: 'الطازج',
    isHealthy: true,
    popularity: 4.5,
    nutrition: {
      calories: 215,
      protein: 27,
      carbs: 0,
      fat: 12,
    },
    recipes: [
      {
        title: 'مسخن فلسطيني',
        description: 'طبق فلسطيني تقليدي شهير بالدجاج والبصل والسماق',
      },
      {
        title: 'دجاج محشي بالأرز',
        description: 'وصفة شهية للمناسبات العائلية',
      },
    ],
  },
  {
    id: 7,
    name: 'خبز طابون',
    description:
      'خبز طابون تقليدي من مخابز دعنا، مخبوز على الحطب بالطريقة الفلسطينية التقليدية. طازج يوميًا.',
    price: 5.0,
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtH0wCwYhi5O6sgNSVzjsFGdS-3wDXLG_4PeXSVbdIXFJPurEZcfQRmn0ITNQMoKkHNfQeNUWSSzvdOBx1RdnJJE0a3OyI8OjaBgftwB1xSyPUjRGqAJGM82i34vsoKwE531DuzV1JRQ/s1600/SAM_2478.jpg',
    categoryId: 6, // Updated to match المخبوزات category ID
    categoryName: 'المخبوزات',
    brandId: 10,
    brandName: 'دعنا',
    isHealthy: true,
    popularity: 4.9,
    nutrition: {
      calories: 80,
      protein: 3,
      carbs: 15,
      fat: 1,
    },
  },
  {
    id: 8,
    name: 'بندورة بلدية كيلو',
    description:
      'بندورة بلدية فلسطينية، مزروعة محليًا في أراضي طولكرم دون استخدام مبيدات كيميائية. طازجة وغنية بالفيتامينات.',
    price: 1,
    image: 'https://www.dooz.ps/wp-content/uploads/2023/08/bandora-0.jpg',
    categoryId: 2, // Updated to match خضروات category ID
    categoryName: 'خضروات',
    brandId: 5,
    brandName: 'الطازج',
    isHealthy: true,
    popularity: 4.4,
    nutrition: {
      calories: 18,
      protein: 1,
      carbs: 4,
      fat: 0,
    },
    recipes: [
      {
        title: 'سلطة فلسطينية',
        description: 'سلطة تقليدية منعشة بزيت الزيتون البلدي',
      },
      {
        title: 'شوربة بندورة بلدية',
        description: 'شوربة منزلية صحية ولذيذة',
      },
    ],
  },
  {
    id: 9,
    name: 'زيت زيتون بكر ممتاز',
    description:
      'زيت زيتون فلسطيني بكر ممتاز من أشجار الزيتون المعمرة في الضفة الغربية، معصور على البارد بالطرق التقليدية.',
    price: 22,
    image: 'https://media.zid.store/thumbs/751db8d1-3667-408a-a61c-dae4a2d767a0/5cbb10ac-0a65-473c-9df2-66acc84bb960-thumbnail-1000x1000-70.jpg',
    categoryId: 8, // Updated to match زيوت category ID
    categoryName: 'زيوت',
    brandId: 4,
    brandName: 'النخلة',
    isHealthy: true,
    popularity: 4.9,
    nutrition: {
      calories: 120,
      protein: 0,
      carbs: 0,
      fat: 14,
    },
  },
  {
    id: 10,
    name: 'تفاح أحمر فلسطيني كيلو',
    description:
      'تفاح أحمر طازج من بساتين فلسطين، مزروع بطرق طبيعية. حلو المذاق وغني بالألياف ومضادات الأكسدة.',
    price: 5,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/1200px-Red_Apple.jpg',
    categoryId: 3, // Updated to match فواكه category ID
    categoryName: 'فواكه',
    brandId: 5,
    brandName: 'الطازج',
    isHealthy: true,
    popularity: 4.3,
    nutrition: {
      calories: 52,
      protein: 0,
      carbs: 14,
      fat: 0,
    },
  },
  {
    id: 11,
    name: 'مياه معدنية كانا مارت 500 مل',
    description:
      'مياه معدنية نقية من ينابيع فلسطين الطبيعية، معبأة في مصانع حديثة حسب المعايير العالمية للجودة.',
    price: 1,
    image: 'https://scontent.fjrs23-1.fna.fbcdn.net/v/t39.30808-6/494720000_1600201430671695_5522005750987822156_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ojgg8N_z01cQ7kNvwGmBETh&_nc_oc=AdneQPQ2PTff_sCa2bkAruvX7kZzbMCTi2dt6p-sGoECK00OIADAhDfc6llbHdk2ars&_nc_zt=23&_nc_ht=scontent.fjrs23-1.fna&_nc_gid=PAYHXqJW5o3hOdhdTPNgYw&oh=00_AfH532sIz3ZDZCC1kIY0H7o9Ffk8QgtMnEUJ7DSr6m8h6Q&oe=6819B35F',
    categoryId: 9, // Updated to match مياه category ID
    categoryName: 'مياه',
    brandId: 20,
    brandName: 'كانا مارت',
    isHealthy: true,
    popularity: 4.7,
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  },
  {
    id: 12,
    name: 'كعك مقدسي',
    description:
      'كعك مقدسي أصلي من مخابز القدس التقليدية، مصنوع حسب الوصفة الفلسطينية القديمة بالسمسم وحبة البركة.',
    price: 3.5,
    image: 'https://www.justfood.tv/UserFiles/makda25122023.jpg',
    categoryId: 6, // Updated to match وجبات خفيفة category ID
    categoryName: 'مخبوزات',
    brandId: 10,
    brandName: 'مخابز دعنا',
    isHealthy: true,
    popularity: 4.8,
    nutrition: {
      calories: 120,
      protein: 3,
      carbs: 18,
      fat: 4,
    },
  },
  {
    id: 13,
    name: 'مخلل',
    description:
      'مخللات فلسطينية مشكلة من إنتاج شركة زادنا، تحضر بالطريقة البيتية التقليدية باستخدام خضروات طازجة.',
    price: 3.5,
    image: 'https://www.palbazaar.com/image/cache/catalog/productimage/151127-500x500.jpg',
    categoryId: 5, // Updated to match معلبات category ID
    categoryName: 'معلبات',
    brandId: 9,
    brandName: 'زادنا',
    isHealthy: true,
    popularity: 4.2,
    nutrition: {
      calories: 35,
      protein: 1,
      carbs: 8,
      fat: 0,
    },
  },
  {
    id: 14,
    name: 'شات كولا 250 مل',
    description:
      'كولا بجميع الأطعمة الانتاج المحلي .',
    price: 1,
    image: 'https://chatcola.ps/wp-content/uploads/2024/07/Chat-Cola-website-1.png',
    categoryId: 11, // Updated to match عصائر ومشروبات غازية category ID
    categoryName: 'عصائر ومشروبات غازية',
    brandId: 7,
    brandName: 'كابي',
    isHealthy: true,
    popularity: 4.5,
    nutrition: {
      calories: 140,
      protein: 0,
      carbs: 32,
      fat: 0,
    },
  },
  {
    id: 15,
    name: 'زيت الصافي 3 لتر',
    description:
      'زيت ذرة من انتاج شركة الصافي بحجم 3 لتر',
    price: 27,
    image: 'https://almukhtar.ps/upload/05-2024/product/IMG_4318-450px.png',
    categoryId: 8, // Updated to match الألبان والأجبان category ID
    categoryName: 'زيوت',
    brandId: 11,
    brandName: 'الصافي',
    isHealthy: false,
    popularity: 4.4,
    nutrition: {
      calories: 720,
      protein: 1,
      carbs: 0,
      fat: 81,
    },
    },
    {
    id: 16,
    name: 'وقية قهوة',
    description: 'وقية من القهوة العربية الطازجة',
    price: 18,
    image: 'https://sheresh.ae/wp-content/uploads/2025/01/MediumWithcarda_mom.webp',
    categoryId: 13,
    categoryName: 'قهوة',
    brandId: 16,
    brandName: 'العميد',
    isHealthy: false,
    popularity: 4.5,
    nutrition: {
      calories: 5,
      protein: 0.3,
      carbs: 0,
      fat: 0.1,
    },
  },
  {
    id: 17,
    name: 'وقية بهار دجاج',
    description: 'خلطة بهارات مخصصة لتتبيل الدجاج',
    price: 8,
    image: 'https://care4mall.online/wp-content/uploads/2020/11/bwebwevbed.png',
    categoryId: 12,
    categoryName: 'بهارات',
    brandId: 12,
    brandName: 'صالح خلف',
    isHealthy: true,
    popularity: 4.2,
    nutrition: {
      calories: 20,
      protein: 0.9,
      carbs: 3,
      fat: 0.5,
    },
  },
  {
    id: 18,
    name: 'علبة شاي ليبتون',
    description: 'شاي أسود من ماركة ليبتون الشهيرة، 100 فتلة',
    price: 10,
    image: 'https://dokan.ps/wp-content/uploads/2020/12/%D8%B4%D8%A7%D9%8A-%D9%84%D9%8A%D8%A8%D8%AA%D9%88%D9%86-150-%D8%BA%D9%85.jpg',
    categoryId: 12,
    categoryName: 'مشروبات',
    brandId: 17,
    brandName: 'ليبتون',
    isHealthy: true,
    popularity: 4.8,
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  },
  {
    id: 19,
    name: 'بكيت ذرة مجمدة 900 غرام',
    description: 'ذرة صفراء مجمدة بجودة عالية، وزن 900 غرام',
    price: 10,
    image: 'https://dokan.ps/wp-content/uploads/2020/12/%D8%B0%D8%B1%D8%A9-%D9%85%D9%81%D8%B1%D8%B2%D8%A7%D8%AA-%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85-800%D8%BA%D9%85.png',
    categoryId: 15,
    categoryName: 'خضار مجمدة',
    brandId: 14,
    brandName: 'فروزينا',
    isHealthy: true,
    popularity: 4.3,
    nutrition: {
      calories: 86,
      protein: 3.2,
      carbs: 19,
      fat: 1.2,
    },
  },
  {
    id: 20,
    name: 'شوكلاته سنكرز 200 غرام',
    description: 'لوح شوكولاتة سنكرز بالحجم العائلي 200 غرام',
    price: 2,
    image: 'https://jebnalak.com/cdn/shop/products/snickers-single-chocolate-50g-127866_800x.jpg?v=1626529404',
    categoryId: 10,
    categoryName: 'حلويات',
    brandId: 13,
    brandName: 'مارس',
    isHealthy: false,
    popularity: 4.9,
    nutrition: {
      calories: 488,
      protein: 7,
      carbs: 58,
      fat: 24,
    },
  },
  {
    id: 21,
    name: '200 غرام تبولة',
    description: 'تبولة طازجة جاهزة للتقديم، 200 غرام',
    price: 8,
    image: 'https://img-global.cpcdn.com/recipes/883c426e51edc135/1200x630cq70/photo.jpg',
    categoryId: 7,
    categoryName: 'سلطات',
    brandId: 5,
    brandName: 'المائدة',
    isHealthy: true,
    popularity: 4.6,
    nutrition: {
      calories: 80,
      protein: 2,
      carbs: 10,
      fat: 4,
    },
  },
  {
    id: 22,
    name: 'سرف اريال 8 كيلو',
    description: 'مسحوق غسيل أريال بحجم كبير 8 كغم',
    price: 48,
    image: 'https://dokan.ps/wp-content/uploads/2020/12/%D8%A7%D8%B1%D9%8A%D8%A7%D9%84-%D9%85%D8%B3%D8%AD%D9%88%D9%82-%D8%BA%D8%B3%D9%8A%D9%84-8-%D9%83.jpg',
    categoryId: 14,
    categoryName: 'مواد تنظيف',
    brandId: 13,
    brandName: 'أريال',
    isHealthy: false,
    popularity: 4.7,
    nutrition: null,
  },
    {
  id: 23,
  name: 'دخان Winston',
  description: 'علبة سجائر Winston زرقاء، تحتوي على 20 سيجارة',
  price: 27,
  image: 'https://tabak.kkiosk.ch/cdn/shop/files/Winston_Blue_Box_LEP_Cigarettes.png?v=1736776473',
  categoryId: 16,
  categoryName: 'دخان',
  brandId: 18,
  brandName: 'Winston',
  isHealthy: false,
  popularity: 4.1,
  nutrition: null,
},
{
  id: 24,
  name: 'دخان Marlboro',
  description: 'علبة سجائر Marlboro حمراء، تحتوي على 20 سيجارة',
  price: 30,
  image: 'https://i0.wp.com/24uuruitdemuur.com/wp-content/uploads/2024/10/marlboro-red-cigarettes-delivery-service.webp?fit=1417%2C1417&ssl=1',
  categoryId: 16,
  categoryName: 'دخان',
  brandId: 19,
  brandName: 'Marlboro',
  isHealthy: false,
  popularity: 4.0,
  nutrition: null,
}

  
];

// المنتجات المميزة
export const featuredProducts = [
  {
   id: 11,
    name: 'مياه معدنية كانا مارت  ',
    price: 1,
    image: 'https://scontent.fjrs23-1.fna.fbcdn.net/v/t39.30808-6/494720000_1600201430671695_5522005750987822156_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ojgg8N_z01cQ7kNvwGmBETh&_nc_oc=AdneQPQ2PTff_sCa2bkAruvX7kZzbMCTi2dt6p-sGoECK00OIADAhDfc6llbHdk2ars&_nc_zt=23&_nc_ht=scontent.fjrs23-1.fna&_nc_gid=aQE7jA05FJ_DNWPTBIXaGQ&oh=00_AfHQkj5iPsB1o8zfpV6X7lPQjM16YESYUl0yBXqwvRBr0g&oe=6819B35F',
     brandName: 'كانا مارت',
    categoryId: 9, // Updated to match مياه category ID
  },
  {
    id: 9,
    name: 'زيت زيتون بكر ممتاز',
    price: 22.0,
    image: 'https://media.zid.store/thumbs/751db8d1-3667-408a-a61c-dae4a2d767a0/5cbb10ac-0a65-473c-9df2-66acc84bb960-thumbnail-1000x1000-70.jpg',
    brandName: 'الأرض',
    categoryId: 8, // Added to ensure consistency
  },
  {
    id: 1,
    name: 'حليب كامل الدسم',
    price: 6,
    image: 'https://dokan.ps/wp-content/uploads/2020/12/%D8%A7%D9%84%D8%AC%D9%86%D9%8A%D8%AF%D9%8A-%D8%AD%D9%84%D9%8A%D8%A8-%D8%B7%D8%A7%D8%B2%D8%AC-%D9%83%D8%A7%D9%85%D9%84-%D8%A7%D9%84%D8%AF%D8%B3%D9%85-1L.jpg',
    brandName: 'الجنيدي',
    categoryId: 1, // Added to ensure consistency
  },
  {
    id: 7,
    name: 'خبز طابون',
    price: 5.0,
    image: 'https://i.ytimg.com/vi/eZ8nysybN6Y/maxresdefault.jpg',
    brandName: 'مخابز دعنا',
    categoryId: 6, // Added to ensure consistency
  },
  {
    id: 12,
    name: 'كعك مقدسي',
    price: 3.5,
    image: 'https://img-global.cpcdn.com/recipes/a66a1069097c5f91/680x482cq70/%D8%A7%D9%84%D8%B5%D9%88%D8%B1%D8%A9-%D8%A7%D9%84%D8%B1%D8%A6%D9%8A%D8%B3%D9%8A%D8%A9-%D9%84%D9%88%D8%B5%D9%81%D8%A9%D8%A7%D9%84%D9%83%D8%B9%D9%83-%D8%A7%D9%84%D9%85%D9%82%D8%AF%D8%B3%D9%8A.jpg',
    brandName: 'مخابز دعنا',
    categoryId: 7, // Added to ensure consistency
  },
  {
    id: 4,
    name: 'عصير برتقال طبيعي',
    price: 3,
    image: 'https://almmedia.almarai.com/Gallery/sku_26710082022152652.png',
    brandName: 'المراعي',
    categoryId: 11, // Added to ensure consistency
  },
];