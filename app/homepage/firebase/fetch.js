// app/page.js
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from './firebase.config';
import ContentDisplay from '../comonents/contentdisplay';
import HomeContent from '../comonents/homecontent';
import Hero from '../comonents/hero';
import Nav from '../comonents/nav';

export default async function Page() {
  const now = new Date().toISOString(); // Example: "2024-08-22T12:00:00Z"

  // Fetch active content from Firestore
  const activeContentQuery = query(
    collection(db, 'homepage'),
    where('startTime', '<=', now),
    where('endTime', '>=', now),
    where('status', '==', 'active'),
    limit(1)
  );

  const activeContentSnapshot = await getDocs(activeContentQuery);

  // Check if there is active content
  const activeContent = activeContentSnapshot.empty
    ? null
    : activeContentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Fetch all homepage content for the Hero component
  const homepageSnapshot = await getDocs(collection(db, 'homepage'));
  const homepageContent = homepageSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <div>
      <Nav />
      {activeContent ? (
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
}
