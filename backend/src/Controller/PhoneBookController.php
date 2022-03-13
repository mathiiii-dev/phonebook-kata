<?php

namespace App\Controller;

use App\Handler\PhoneBookHandler;
use App\Repository\PhoneBookRepository;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PhoneBookController extends AbstractController
{

    private PhoneBookHandler $phoneBookHandler;
    private PhoneBookRepository $phoneBookRepository;

    public function __construct(PhoneBookHandler $phoneBookHandler, PhoneBookRepository $phoneBookRepository)
    {
        $this->phoneBookHandler = $phoneBookHandler;
        $this->phoneBookRepository = $phoneBookRepository;
    }

    /**
     * @throws Exception
     */
    #[Route('/phonebook/register', name: 'app_phone_book_register', methods: 'POST')]
    public function register(Request $request): Response
    {
        $this->phoneBookHandler->handlePhoneBookCreate($request);
        return new JsonResponse([], Response::HTTP_CREATED);
    }

    /**
     * @throws Exception
     */
    #[Route('/phonebook/{id}/edit', name: 'app_phone_book_edit', methods: 'PATCH')]
    public function edit(Request $request, int $id): Response
    {
        $this->phoneBookHandler->handlePhoneBookEdit($request, $id);
        return new JsonResponse([], Response::HTTP_NO_CONTENT);
    }

    #[Route('/phonebook', name: 'app_get_phone_books', methods: 'GET')]
    public function getPhoneBooks(): Response
    {
        $phones = $this->phoneBookRepository->findAll();
        return $this->json($phones, Response::HTTP_OK, []);
    }

    #[Route('/phonebook/{id}', name: 'app_get_phone_book', methods: 'GET')]
    public function getPhoneBook(int $id): Response
    {
        $phone = $this->phoneBookRepository->findOneBy(['id' => $id]);
        return $this->json($phone, Response::HTTP_OK, []);
    }
}
