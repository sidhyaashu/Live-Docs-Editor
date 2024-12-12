import { AddDocumentBtn } from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import Header from '@/components/Header';
import { Notifications } from '@/components/Notifications';
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

type Document = {
  id: string;
  metadata: {
    title: string;
  };
  createdAt: string;
};

const Home = async () => {
  // Fetch current user
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  // Fetch documents
  let roomDocuments: { data: Document[] } = { data: [] };
  try {
    roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);
  } catch (error) {
    console.error('Failed to fetch documents:', error);
  }

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomDocuments.data.length > 0 ? (
        <DocumentList
          documents={roomDocuments.data}
          userId={clerkUser.id}
          email={clerkUser.emailAddresses[0].emailAddress}
        />
      ) : (
        <EmptyState
          userId={clerkUser.id}
          email={clerkUser.emailAddresses[0].emailAddress}
        />
      )}
    </main>
  );
};

// Component for the document list
const DocumentList = ({
  documents,
  userId,
  email,
}: {
  documents: Document[];
  userId: string;
  email: string;
}) => (
  <div className="document-list-container">
    <div className="document-list-title">
      <h3 className="text-28-semibold">All documents</h3>
      <AddDocumentBtn userId={userId} email={email} />
    </div>
    <ul className="document-ul">
      {documents.map((document) => (
        <li key={document.id} className="document-list-item">
          <Link
            href={`/documents/${document.id}`}
            className="flex flex-1 items-center gap-4"
          >
            <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
              <Image
                src="/assets/icons/doc.svg"
                alt="file"
                width={40}
                height={40}
              />
            </div>
            <div className="space-y-1">
              <p className="line-clamp-1 text-lg">{document.metadata.title}</p>
              <p className="text-sm font-light text-blue-100">
                Created about {dateConverter(document.createdAt)}
              </p>
            </div>
          </Link>
          <DeleteModal roomId={document.id} />
        </li>
      ))}
    </ul>
  </div>
);

// Component for the empty state
const EmptyState = ({ userId, email }: { userId: string; email: string }) => (
  <div className="document-list-empty">
    <Image
      src="/assets/icons/doc.svg"
      alt="file"
      width={40}
      height={40}
      className="mx-auto"
    />
    <AddDocumentBtn userId={userId} email={email} />
  </div>
);

export default Home;
