      {isSigned === TIsSigned.F && <LoginBoxModal />}
      {isModalOpen && (
        <SaveChatModal
          authData={authData}
          categories={categories}
          setIsModalOpen={setIsModalOpen}
        />
      )}
