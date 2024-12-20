// app/page.js
import { collection, getDocs, query, where, limit, Timestamp } from 'firebase/firestore';
import { db } from './firebase.config';
import ContentDisplay from '../comonents/contentdisplay' ;
import HomeContent from '../comonents/homecontent';
import Hero from '../comonents/hero';
import Nav from '../comonents/nav';
// app/page.js



export default async function Page() {
  try {
    // Get the current time as a Firebase Timestamp
    const now = Timestamp.now();

    // Fetch active content from Firestore
    const activeContentQuery = query(
      collection(db, 'homepage'),
      where('startTime', '<=', now),
      where('endTime', '>=', now),
      where('status', '==', 'active'),
      limit(1)
    );

    const activeContentSnapshot = await getDocs(activeContentQuery);

    const activeContent = activeContentSnapshot.empty
      ? null
      : activeContentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch all homepage content for the Hero component
    const homepageSnapshot = await getDocs(collection(db, 'homepage'));
    const homepageContent = homepageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return (
      <div>
        <Nav />
        {activeContent && activeContent.length > 0 ? (
          <div>
            {activeContent.map(item => (
              <ContentDisplay key={item.id} content={item} />
            ))}
          </div>
        ) : (
          <div className="text-white">
            {homepageContent.map(item => (
              <div key={item.id}>
                {item.id === 'lRW6HUZQrHeAZxZoxOow' && <Hero stat={item} />}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading content. Please try again later.</div>;
  }
}
